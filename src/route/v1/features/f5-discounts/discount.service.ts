import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
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

  async isDiscountExist(discountId: string) {
    const discountExist = await this.discountRepository.findOneBy({
      _id: discountId,
    });

    if (!discountExist) {
      throw new BadRequestException('this discount is not exist');
    }
    return discountExist;
  }

  async VoucherDiscount(discountId: string, subToTal: number) {
    const voucher = await this.discountRepository.findOneBy({
      _id: discountId,
    });

    if (!voucher) {
      throw new BadRequestException('this voucher is not exist');
    }

    if (subToTal < voucher.minOrderValue) {
      throw new BadRequestException('This voucher is not condition to apply.');
    }

    let discountAmount = 0;
    if (voucher.discountType === 'percentage') {
      discountAmount = (subToTal * voucher.discountValue) / 100;
    } else if (voucher.discountType === 'fixed') {
      discountAmount = voucher.discountValue;
    }

    return discountAmount;
  }
}
