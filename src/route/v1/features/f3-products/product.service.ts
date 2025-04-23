import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import ReviewRepository from '../f20-reviews/review.repository';
import { SearchFilterDto } from './dto/search-filter.dto';
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

  async filterProducts(filterDto: SearchFilterDto) {
    const { categoryName, brandName, minPrice, maxPrice } = filterDto;
    const pipeline: any[] = [
      {
        $addFields: {
          categoryIds: {
            $map: {
              input: '$categoryIds',
              as: 'id',
              in: { $toObjectId: '$$id' },
            },
          },
          skuIds: {
            $map: {
              input: '$skuIds',
              as: 'id',
              in: { $toObjectId: '$$id' },
            },
          },
          brandId: { $toObjectId: '$brandId' },
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryIds',
          foreignField: '_id',
          as: 'categories',
        },
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brandId',
          foreignField: '_id',
          as: 'brand',
        },
      },
      { $unwind: { path: '$brand', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'skus',
          localField: 'skuIds',
          foreignField: '_id',
          as: 'skus',
        },
      },
      { $unwind: { path: '$skus', preserveNullAndEmptyArrays: true } },
    ];

    if (categoryName) {
      pipeline.push({
        $match: {
          'categories.name': { $regex: categoryName, $options: 'i' },
        },
      });
    }

    if (brandName) {
      pipeline.push({
        $match: {
          'brand.name': { $regex: brandName, $options: 'i' },
        },
      });
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceCond: any = {};
      if (minPrice !== undefined) priceCond.$gte = minPrice;
      if (maxPrice !== undefined) priceCond.$lte = maxPrice;

      pipeline.push({
        $match: {
          'skus.basePrice': priceCond,
        },
      });
    }

    // Group lại theo product
    pipeline.push({
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        brand: { $first: '$brand' },
        categories: { $first: '$categories' },
        skus: { $push: '$skus' },
      },
    });

    return this.productRepository.aggregate(pipeline);
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
