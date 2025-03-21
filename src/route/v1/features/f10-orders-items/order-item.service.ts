import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { OrderItemDocument } from './schemas/order-item.schema';
import OrderItemRepository from './order-item.repository';

@Injectable()
export default class OrderItemService extends BaseService<OrderItemDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly orderItemRepository: OrderItemRepository,
  ) {
    super(logger, orderItemRepository);
  }
}
