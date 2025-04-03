import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import DiscountService from '../f5-discounts/discount.service';
import ShippingMethodService from '../f6-shipping-methods/shipping-method.service';
import CartRepository from '../f8-carts/cart.repository';
import CartService from '../f8-carts/cart.service';
import OrderRepository from './order.repository';
import { OrderDocument } from './schemas/order.schema';

@Injectable()
export default class OrderService extends BaseService<OrderDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly orderRepository: OrderRepository,
    readonly discountService: DiscountService,
    readonly shippingMethodService: ShippingMethodService,
    readonly cartService: CartService,
    readonly cartRepository: CartRepository,
  ) {
    super(logger, orderRepository);
  }

  // async checkoutReview(input: CheckoutReviewDto) {
  //   // calc subToTal from orderItems
  //   const subToTal = await this._calcSubtotal(input.orderItems);

  //   // calc discountAmount
  //   let calculateDiscountAmount = 0;
  //   if (input.discountId) {
  //     const isExist = await this.discountService.isDiscountExist(
  //       input.discountId,
  //     );
  //     if (!isExist) {
  //       throw new NotFoundException('this discount is not exist');
  //     } else {
  //       calculateDiscountAmount = await this.discountService.VoucherDiscount(
  //         input.discountId,
  //         subToTal,
  //       );
  //     }
  //   }

  //   // calc shipping cost
  //   let shippingCost = 0;
  //   if (input.shippingMethodId) {
  //     const isExist = await this.shippingMethodService.isShippingExist(
  //       input.shippingMethodId,
  //     );
  //     if (!isExist) {
  //       throw new NotFoundException('this shipping is not exist');
  //     } else {
  //       shippingCost = await this.shippingMethodService.getShippingCost(
  //         input.shippingMethodId,
  //       );
  //     }
  //   }

  //   // totalAmount
  //   const totalAmount = subToTal + shippingCost - calculateDiscountAmount;

  //   return {
  //     ...input,
  //     checkout: {
  //       subTotal: subToTal, // tong tien sp
  //       shippingCost: shippingCost,
  //       discountAmount: calculateDiscountAmount, // tong tien giam gia
  //       totalAmount: totalAmount,
  //     },
  //   };
  // }

  // private async _calcSubtotal(
  //   items: CheckoutReviewDto['orderItems'],
  // ): Promise<any> {
  //   if (!items || !Array.isArray(items)) {
  //     throw new NotFoundException(
  //       'orderItems does not exist or is not an array',
  //     );
  //   }

  //   // using map tho create a new array items
  //   const totalItem = items.map((item) => item.price * item.quantity);
  //   console.log(totalItem);

  //   //using reduce to calculate subtotal
  //   const subToTal = totalItem.reduce((total, amount) => total + amount);

  //   return subToTal;
  // }

  // async createOrderCheckout(input: CreateOrderDto) {
  //   if (!input.userId) {
  //     throw new Error('userId is required in CreateOrderDto');
  //   }
  //   return await this.orderRepository.create(input);
  // }
}
