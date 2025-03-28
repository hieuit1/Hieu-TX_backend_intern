import { PartialType } from '@nestjs/mapped-types';
import CreateOrderItemDto from '../../f10-orders-items/dto/create-order-item.dto';
import CreateOrderDto from './create-order.dto';

export default class CheckoutReviewDto extends PartialType(CreateOrderDto) {
  orderItems: CreateOrderItemDto;
}
