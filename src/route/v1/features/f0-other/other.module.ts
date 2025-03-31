import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import OrderItemModule from '../f10-orders-items/order-item.module';
import DiscountModule from '../f5-discounts/discount.module';
import ShippingMethodModule from '../f6-shipping-methods/shipping-method.module';
import CartModule from '../f8-carts/cart.module';
import OrderModule from '../f9-orders/order.module';
import OtherController from './other.controller';
import OtherRepository from './other.repository';
import OtherService from './other.service';
import { Other, OtherSchema } from './schemas/other.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Other.name,
        schema: OtherSchema,
      },
    ]),
    CartModule,
    ShippingMethodModule,
    DiscountModule,
    OrderModule,
    OrderItemModule,
  ],
  controllers: [OtherController],
  providers: [OtherService, OtherRepository],
  exports: [OtherService, OtherRepository],
})
export default class OtherModule {}
