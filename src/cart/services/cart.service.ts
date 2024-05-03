import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

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
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };

    this.userCarts[userId] = userCart;

    return userCart;
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
