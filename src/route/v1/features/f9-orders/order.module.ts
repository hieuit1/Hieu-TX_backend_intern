import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import DiscountModule from '../f5-discounts/discount.module';
import ShippingMethodModule from '../f6-shipping-methods/shipping-method.module';
import OrderController from './order.controller';
import OrderRepository from './order.repository';
import OrderService from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    DiscountModule,
    ShippingMethodModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderService, OrderRepository],
})
export default class OrderModule {}
