import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import DiscountService from '../f5-discounts/discount.service';
import ShippingMethodService from '../f6-shipping-methods/shipping-method.service';
import CartService from '../f8-carts/cart.service';
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

  async checkout(userId: string, shopId: string) {
    const totalCart = await this.cartService.totalCart(userId, {});
    console.log('Total cart:', totalCart);

    const costShipping = await this.shippingMethodService.getShippingCost(
      shopId,
    );
    console.log('costShipping', costShipping);

    const voucherDiscount = await this.discountService.getVoucherDiscount(
      shopId,
      totalCart,
    );
    console.log('vocherDisscount', voucherDiscount);

    const totalPayment = totalCart + costShipping - voucherDiscount;

    return { totalCart, costShipping, voucherDiscount, totalPayment };
  }
}
