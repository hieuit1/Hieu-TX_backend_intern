import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import FlashSaleModule from '../f18-flash-sales/flash-sale.module';
import ProductModule from '../f3-products/product.module';
import DiscountModule from '../f5-discounts/discount.module';
import CartController from './cart.controller';
import CartRepository from './cart.repository';
import CartService from './cart.service';
import { Cart, CartSchema } from './schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema,
      },
    ]),
    ProductModule,
    DiscountModule,
    FlashSaleModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService, CartRepository],
})
export default class CartModule {}
