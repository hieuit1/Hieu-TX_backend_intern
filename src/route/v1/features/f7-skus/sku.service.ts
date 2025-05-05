import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SelectedAttributeDto } from './dto/select-attribute.dto';
import { SkuDocument } from './schemas/sku.schema';
import SkuRepository from './sku.repository';

@Injectable()
export default class SkuService extends BaseService<SkuDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly skuRepository: SkuRepository,
  ) {
    super(logger, skuRepository);
  }

  async reduceStock(productId: string, skuId: string, quantity: number) {
    const sku = await this.skuRepository.findOneBy({ _id: skuId, productId });

    if (!sku) {
      throw new NotFoundException('sku is not exist');
    }

    if (sku.stock < quantity) {
      throw new BadRequestException('Product quantity is out of stock');
    }

    // reduce stock
    sku.stock -= quantity;

    await this.skuRepository.updateOneBy({ _id: skuId }, { stock: sku.stock });

    return {
      message: 'Stock reduced successfully',
      productId,
      skuId,
      stock: sku.stock,
    };
  }

  // get attributes
  async getSelectableAttributes(productId: string) {
    const skus = await this.skuRepository.findManyBy({ productId });

    const attributeMap: any = new Map<string, Set<string>>();

    for (const sku of skus) {
      for (const attr of sku.attributes) {
        if (!attributeMap.has(attr.attributeName)) {
          attributeMap.set(attr.attributeName, new Set());
        }
        attributeMap.get(attr.attributeName).add(attr.value);
      }
    }

    const result = [];
    for (const [attributeName, valueSet] of attributeMap.entries()) {
      result.push({
        attributeName,
        values: Array.from(valueSet),
      });
    }

    return result;
  }

  // take customer
  async selectCategory(productId: string, selectAttrs: SelectedAttributeDto[]) {
    const skus = await this.skuRepository.findManyBy({ productId });

    if (!skus.length) {
      throw new BadRequestException('No SKU found for this product');
    }

    for (const sku of skus) {
      const matched = selectAttrs.every((selected) =>
        sku.attributes.some(
          (attr: any) =>
            attr.attributeName === selected.attributeName &&
            attr.value === selected.value,
        ),
      );
      if (matched) return sku;
    }

    return null;
  }
}
