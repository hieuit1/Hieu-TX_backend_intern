import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import CreateOrderItemDto from '../f10-orders-items/dto/create-order-item.dto';
import OrderItemService from '../f10-orders-items/order-item.service';
import DiscountService from '../f5-discounts/discount.service';
import ShippingMethodService from '../f6-shipping-methods/shipping-method.service';
import CartService from '../f8-carts/cart.service';
import CheckoutReviewDto from '../f9-orders/dto/checkout-review.dto';
import { OrderStatus } from '../f9-orders/enums/order-status.enum';
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
  ) {
    super(logger, otherRepository);
  }

  async checkout(userId: string, input: CheckoutReviewDto) {
    if (!userId) {
      throw new Error('UserId is missing');
    }
    // checkoutreview product you want order
    const inputReviewed = await this.orderService.checkoutReview(input);

    //create order
    const order = await this.orderService.createOrderCheckout({
      userId,
      shopId: inputReviewed.shopId ?? '',
      discountId: inputReviewed.discountId,
      shippingMethodId: inputReviewed.shippingMethodId,
      totalAmount: inputReviewed.checkout.totalAmount,
      status: OrderStatus.Pending,
    });

    //create orderItems
    const orderItems: CreateOrderItemDto[] = inputReviewed.orderItems.map(
      (item) => ({
        orderId: order.id, // Gán orderId của đơn hàng mới
        productId: item.productId,
        skuId: item.skuId,
        quantity: item.quantity,
        price: item.price,
      }),
    );

    await this.orderItemService.createOrderItems(orderItems);

    // when you order successfuly  remove items in  carts

    // const removoItemInCart = this.cartService.removeFromCart(userId, itemId)

    // reduce discount quantity in cart when you order successfully
    //const ReduceQuatityInCart = this.cartService.discountQuantityInCart(itemId)

    // reduce product/sku stock
    //const reduceProductInCart = this.cartService.discountProduct(pruductId, skuId)

    // send notification when you order successfuly
    //const sendNotification = this.notificationService.sendNotificaitonPayment(notificationId)

    return order;
  }
}
