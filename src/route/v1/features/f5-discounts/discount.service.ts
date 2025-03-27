import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import DiscountRepository from './discount.repository';
import { DiscountDocument } from './schemas/discount.schema';

@Injectable()
export default class DiscountService extends BaseService<DiscountDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly discountRepository: DiscountRepository,
  ) {
    super(logger, discountRepository);
  }

  async getVoucherDiscount(shopId: string, totalCart: number) {
    const voucher = await this.discountRepository.findOneBy({ shopId });

    if (!voucher) {
      return 0;
    }

    if (totalCart < voucher.minOrderValue) {
      return 0;
    }

    let discountAmount = 0;
    if (voucher.discountType === 'percentage') {
      discountAmount = (totalCart * voucher.discountValue) / 100;
    } else if (voucher.discountType === 'fixed') {
      discountAmount = voucher.discountValue;
    }

    return discountAmount;
  }
}
