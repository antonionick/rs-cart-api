import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { OrderDatabaseService } from 'src/order/database/order-database.service';

@Module({
  providers: [ OrderService, OrderDatabaseService ],
  exports: [ OrderService ]
})
export class OrderModule {}
