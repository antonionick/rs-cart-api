import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { CartDatabaseService } from 'src/cart/database/cart-database.service';


@Module({
  imports: [ OrderModule ],
  providers: [ CartService, CartDatabaseService ],
  controllers: [ CartController ]
})
export class CartModule {}
