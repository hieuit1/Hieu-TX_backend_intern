import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import DiscountService from '../f5-discounts/discount.service';
import CheckoutReviewDto from './dto/checkout-review.dto';
import OrderRepository from './order.repository';
import { OrderDocument } from './schemas/order.schema';

@Injectable()
export default class OrderService extends BaseService<OrderDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly orderRepository: OrderRepository,
    readonly discountService: DiscountService,
  ) {
    super(logger, orderRepository);
  }

  async checkoutReview(input: CheckoutReviewDto) {
    // calc subToTal from orderItems
    const subToTal = await this._calcSubtotal(input.orderItems);
    // calc discountAmount

    // const calculateDiscountAmount = await this.discountService.VoucherDiscount(input.shopId, input.totalAmount);
    if (!input.shopId) {
      throw new Error('Shop ID is required');
    }
    const shopId = input.shopId ?? '';
    const calculateDiscountAmount = await this.discountService.VoucherDiscount(
      shopId,
      subToTal,
    );
    // calc shipping cost

    return {
      ...input,
      checkout: {
        // totalAmount: number;
        // shippingCost: number;
        // subTotal: number; // tong tien sp
        // discountAmount: number; // tong tien giam gia
      },
    };
  }

  private async _calcSubtotal(
    items: CheckoutReviewDto['orderItems'],
  ): Promise<number> {
    if (!items || !Array.isArray(items)) {
      return 0;
    }
    return items.reduce(
      (total, item) => total + items.price * item.quantity,
      0,
    );
  }
}
