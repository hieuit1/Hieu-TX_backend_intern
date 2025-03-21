import { PartialType } from '@nestjs/mapped-types';
import CreateOrderItemDto from './create-order-item.dto';

export default class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
