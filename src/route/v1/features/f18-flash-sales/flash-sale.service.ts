import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import FlashSaleRepository from './flash-sale.repository';
import { FlashSaleDocument } from './schemas/flash-sale.schema';

@Injectable()
export default class FlashSaleService extends BaseService<FlashSaleDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly flashSaleRepository: FlashSaleRepository,
  ) {
    super(logger, flashSaleRepository);
  }
}
