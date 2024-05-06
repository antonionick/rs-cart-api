import { Injectable } from '@nestjs/common';

import { Cart } from '../models';
import { CartDatabaseService } from 'src/cart/database/cart-database.service';

@Injectable()
export class CartService {
  constructor(private readonly cartDatabaseService: CartDatabaseService) {}

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartDatabaseService.findCart(userId);
  }

  async createByUserId(userId: string): Promise<Cart> {
    return await this.cartDatabaseService.createCart(userId);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    const { id } = await this.findOrCreateByUserId(userId);

    await this.cartDatabaseService.updateCart(id, items);

    return await this.findByUserId(userId);
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.cartDatabaseService.removeCart(userId);
  }
}
