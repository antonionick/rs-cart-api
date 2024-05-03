import { Injectable } from '@nestjs/common';

import { Cart } from '../models';
import { CartDatabaseService } from 'src/cart/database/cart-database.service';

@Injectable()
export class CartService {
  constructor(private readonly cartDatabaseService: CartDatabaseService) {}

  private userCarts: Record<string, Cart> = {};

  async findByUserId(userId: string): Promise<Cart> {
    return await this.cartDatabaseService.findByUserId(userId);
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
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    this.userCarts[userId] = { ...updatedCart };

    return { ...updatedCart };
  }

  removeByUserId(userId): void {
    this.userCarts[userId] = null;
  }
}
