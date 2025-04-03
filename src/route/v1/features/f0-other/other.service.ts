import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import OrderItemService from '../f10-orders-items/order-item.service';
import NotificationService from '../f11-notifications/notification.service';
import DiscountService from '../f5-discounts/discount.service';
import ShippingMethodService from '../f6-shipping-methods/shipping-method.service';
import SkuService from '../f7-skus/sku.service';
import CartRepository from '../f8-carts/cart.repository';
import CartService from '../f8-carts/cart.service';
import OrderService from '../f9-orders/order.service';
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
    readonly orderService: OrderService,
    readonly orderItemService: OrderItemService,
    readonly cartReponsitory: CartRepository,
    readonly skuService: SkuService,
    readonly notificationService: NotificationService,
  ) {
    super(logger, otherRepository);
  }

  // async checkout(userId: string, input: CheckoutReviewDto) {
  //   // checkoutreview product you want order
  //   const inputReviewed = await this.orderService.checkoutReview(input);

  //   //create order
  //   const order = await this.orderService.createOrderCheckout({
  //     userId,
  //     shopId: inputReviewed.shopId ?? '',
  //     discountId: inputReviewed.discountId,
  //     shippingMethodId: inputReviewed.shippingMethodId,
  //     totalAmount: inputReviewed.checkout.totalAmount,
  //     status: OrderStatus.Pending,
  //   });

  //   //create orderItems
  //   const orderItems: CreateOrderItemDto[] = inputReviewed.orderItems.map(
  //     (item) => ({
  //       ...item,
  //       orderId: order.id, // Gán orderId của đơn hàng mới
  //     }),
  //   );

  //   await this.orderItemService.createOrderItems(orderItems);

  //   // when you order successfuly  remove items in  carts
  //   const removeCheckoutFromCart = await Promise.all(
  //     inputReviewed.orderItems.map((item) =>
  //       this.cartService.removeCheckoutFromCart(userId, item.skuId),
  //     ),
  //   );

  //   // reduce discount
  //   if (inputReviewed.discountId) {
  //     await this.discountService.reduceDiscountQuatity(
  //       inputReviewed.discountId,
  //     );
  //   }

  //   // reduce product/sku stock
  //   await Promise.all(
  //     inputReviewed.orderItems.map((item) =>
  //       this.skuService.reduceStock(item.productId, item.skuId, item.quantity),
  //     ),
  //   );

  //   // send notification when you order successfuly
  //   const sendNotification = await this.notificationService.sendNotificaiton(
  //     userId,
  //     order.id,
  //   );

  //   return order;
  // }
}
