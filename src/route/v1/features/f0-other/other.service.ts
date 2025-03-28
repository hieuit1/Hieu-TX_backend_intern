import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import DiscountService from '../f5-discounts/discount.service';
import ShippingMethodService from '../f6-shipping-methods/shipping-method.service';
import CartService from '../f8-carts/cart.service';
import CheckoutReviewDto from '../f9-orders/dto/checkout-review.dto';
import OtherRepository from './other.repository';
import { OtherDocument } from './schemas/other.schema';

@Injectable()
export default class OtherService extends BaseService<OtherDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly otherRepository: OtherRepository,
    readonly cartService: CartService,
    readonly shippingMethodService: ShippingMethodService,
    readonly discountService: DiscountService,
  ) {
    super(logger, otherRepository);
  }

  async checkout(userId: string, input: CheckoutReviewDto) {
    // const inputReviewed = await this.orderService.checkoutReview(input
    // create order
    // create orderItems: inputREviewd.items.map(item => ({...item, orderId}))
    // remove items in  carts
    // reduce discount quantity
    // reduce product/sku stock
    // return order

    const totalCart = 0;
    console.log('Total cart:', totalCart);
  }
}
