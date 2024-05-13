import { Injectable } from '@nestjs/common';
import { Cart, CartItem } from 'src/cart/models';
import { DatabaseService } from 'src/shared/database.service';

interface IUserIdResult {
  id: string;
}

interface ICartItemsResult {
  product_id: string;
  count: number;
}

interface ICreateCartResult {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  status: 'OPEN';
}

const CART_BY_USER_ID_QUERY = 'SELECT id from carts WHERE user_id = $1';
const CART_ITEMS_BY_CART_ID_QUERY =
  'SELECT product_id, count from cart_items WHERE cart_id = $1';

const CREATE_CART_QUERY =
  "INSERT INTO carts (id, user_id, created_at, updated_at, status) VALUES (gen_random_uuid(), $1, CURRENT_DATE, CURRENT_DATE, 'OPEN') RETURNING *";

const UPDATE_CART_ITEMS_QUERY =
  'UPDATE cart_items SET count = $1 WHERE cart_id = $2 and product_id = $3';
const UPDATE_CART_QUERY = "UPDATE carts SET status = 'ORDERED' WHERE id = $1";

const DELETE_CART_QUERY = 'DELETE FROM carts WHERE user_id = $1';
const DELETE_CART_ITEMS_QUERY = 'DELETE FROM cart_items WHERE cart_id = $1';

@Injectable()
export class CartDatabaseService {
  async findCart(userId: string): Promise<Cart> {
    const client = await DatabaseService.getClient();

    const queryResult = await client.query<IUserIdResult>(
      CART_BY_USER_ID_QUERY,
      [userId],
    );
    const userCartId = queryResult.rows[0]?.id;

    if (!userCartId) {
      return null;
    }

    const cartItemsQueryResult = await client.query<ICartItemsResult>(
      CART_ITEMS_BY_CART_ID_QUERY,
      [userCartId],
    );
    const cartItems = cartItemsQueryResult.rows.map(cartItem => ({
      count: cartItem.count,
      product: { id: cartItem.product_id },
    }));

    return {
      id: userCartId,
      items: cartItems,
    };
  }

  async createCart(userId: string): Promise<Cart> {
    const client = await DatabaseService.getClient();

    const createCartQueryResult = await client.query<ICreateCartResult>(
      CREATE_CART_QUERY,
      [userId],
    );
    const createdCart = createCartQueryResult.rows[0];

    return {
      id: createdCart.id,
      items: [],
    };
  }

  async updateCart(cartId: string, items: CartItem[]): Promise<void> {
    const client = await DatabaseService.getClient();

    const updateCartQueries = items.map(item =>
      client.query(UPDATE_CART_ITEMS_QUERY, [
        item.count,
        cartId,
        item.product.id,
      ]),
    );

    await Promise.all(updateCartQueries);
  }

  async updateCartStatusToOrdered(cartId: string): Promise<void> {
    const client = await DatabaseService.getClient();

    await client.query(UPDATE_CART_QUERY, [cartId]);
  }

  async removeCart(userId: string): Promise<void> {
    const client = await DatabaseService.getClient();

    const queryResult = await client.query<IUserIdResult>(
      CART_BY_USER_ID_QUERY,
      [userId],
    );
    const userCartId = queryResult.rows[0]?.id;

    if (!userCartId) {
      return;
    }

    await client.query(DELETE_CART_ITEMS_QUERY, [userCartId]);
    await client.query(DELETE_CART_QUERY, [userId]);
  }
}
