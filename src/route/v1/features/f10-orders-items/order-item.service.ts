import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import CreateOrderItemDto from './dto/create-order-item.dto';
import OrderItemRepository from './order-item.repository';
import { OrderItemDocument } from './schemas/order-item.schema';

@Injectable()
export default class OrderItemService extends BaseService<OrderItemDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly orderItemRepository: OrderItemRepository,
  ) {
    super(logger, orderItemRepository);
  }

  async createOrderItems(orderItems: CreateOrderItemDto[]) {
    return await this.orderItemRepository.create(orderItems);
  }
}
