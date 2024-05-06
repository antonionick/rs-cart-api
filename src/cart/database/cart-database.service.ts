import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Cart, CartItem } from 'src/cart/models';

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

const DELETE_CART_QUERY = 'DELETE FROM carts WHERE user_id = $1';
const DELETE_CART_ITEMS_QUERY = 'DELETE FROM cart_items WHERE cart_id = $1';

@Injectable()
export class CartDatabaseService {
  private client: Client;

  async findCart(userId: string): Promise<Cart> {
    const client = await this.getClient();

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
    const client = await this.getClient();

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
    const client = await this.getClient();

    const updateCartQueries = items.map(item =>
      client.query(UPDATE_CART_ITEMS_QUERY, [
        item.count,
        cartId,
        item.product.id,
      ]),
    );

    await Promise.all(updateCartQueries);
  }

  async removeCart(userId: string): Promise<void> {
    const client = await this.getClient();

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

  private async getClient(): Promise<Client> {
    if (this.client) {
      return this.client;
    }

    try {
      const client = new Client({
        host: process.env.host,
        port: Number(process.env.port),
        database: process.env.database,
        user: process.env.user,
        password: process.env.password,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      await client.connect();

      this.client = client;

      return this.client;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}
