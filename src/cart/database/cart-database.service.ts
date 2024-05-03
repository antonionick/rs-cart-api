import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Cart } from 'src/cart/models';

interface IUserIdResult {
  id: string;
}

interface ICartItemsResult {
  product_id: string;
  count: number;
}

const CART_BY_USER_ID_QUERY = 'SELECT id from carts where user_id = $1';
const CART_ITEMS_BY_CART_ID_QUERY =
  'SELECT product_id, count from cart_items where cart_id = $1';

@Injectable()
export class CartDatabaseService {
  private client: Client;

  async findByUserId(userId: string): Promise<Cart> {
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
