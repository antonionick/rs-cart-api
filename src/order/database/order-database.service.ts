import { Injectable } from '@nestjs/common';
import { CreateOrder, Order } from 'src/order/models';
import { DatabaseService } from 'src/shared/database.service';

const CREATE_ORDER_QUERY =
  "INSERT INTO orders (id, user_id, cart_id, payment, delivery, comments, status, total) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, 'inProgress', $6) RETURNING *";

@Injectable()
export class OrderDatabaseService {
  async createOrder(order: CreateOrder): Promise<Order> {
    const client = await DatabaseService.getClient();

    const createOrderQueryResult = await client.query<Order>(
      CREATE_ORDER_QUERY,
      [
        order.userId,
        order.cartId,
        order.payment,
        order.delivery,
        order.comments,
        order.total,
      ],
    );

    return createOrderQueryResult.rows[0];
  }
}
