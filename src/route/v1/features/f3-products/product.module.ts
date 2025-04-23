import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import ReviewModule from '../f20-reviews/review.module';
import ProductController from './product.controller';
import ProductRepository from './product.repository';
import ProductService from './product.service';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    ReviewModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService, ProductRepository],
})
export default class ProductModule {}
