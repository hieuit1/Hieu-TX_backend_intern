import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import ReviewRepository from '../f20-reviews/review.repository';
import ProductRepository from './product.repository';
import { ProductDocument } from './schemas/product.schema';

@Injectable()
export default class ProductService extends BaseService<ProductDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly productRepository: ProductRepository,
    readonly reviewRepository: ReviewRepository,
  ) {
    super(logger, productRepository);
  }

  async detailProduct(productId: string) {
    const product = await this.productRepository.findOneBy(
      { _id: productId },
      {
        populate: [
          {
            path: 'shopId',
            select:
              'avatar fullName totalRatings totalReviews totalProducts location street',
          },
        ],
      },
    );

    if (!product) {
      throw new Error('Product not found');
    }

    const reviews = await this.reviewRepository.findOneBy(
      {
        productId: product._id,
      },
      {
        populate: [{ path: 'customerId' }, { path: 'replyId' }],
      },
    );

    return { product, reviews };
  }
}
