import { Injectable } from '@nestjs/common';
import { OrderDatabaseService } from 'src/order/database/order-database.service';
import { CreateOrder, Order } from '../models';

@Injectable()
export class OrderService {
  constructor(private readonly orderDatabaseService: OrderDatabaseService) {}

  async create(data: CreateOrder): Promise<Order> {
    return await this.orderDatabaseService.createOrder(data);
  }
}
