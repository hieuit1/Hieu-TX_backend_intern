import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItem, OrderItemSchema } from './schemas/order-item.schema';
import OrderItemController from './order-item.controller';
import OrderItemRepository from './order-item.repository';
import OrderItemService from './order-item.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: OrderItem.name,
        schema: OrderItemSchema,
      },
    ]),
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepository],
  exports: [OrderItemService, OrderItemRepository],
})
export default class OrderItemModule {}
