import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import WarrantyDto from '../dto/warranty-product.dto';
import { WarrantySchema } from './warranty.schema';

@Schema({ timestamps: true, versionKey: false, collection: 'products' })
export class Product {
  @Prop({ type: String, ref: 'User', required: true })
  creatorId: string;

  @Prop({ type: [String], ref: 'Category', default: [] })
  categoryIds: string[];

  @Prop({ type: String, ref: 'Brand', required: true })
  brandId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: String, default: '' })
  video: string;

  @Prop({ type: [WarrantySchema], default: [] })
  warranties: WarrantyDto[];

  @Prop({ type: Number, default: 0 })
  viewsCount: number;

  @Prop({ type: Number, default: 0 })
  soldCount: number;

  @Prop({ type: Number, default: 0 })
  reviewsCount: number;

  @Prop({ type: Number, default: 0 })
  totalRatings: number;

  @Prop({ type: Number, default: 0 })
  likedCount: number;

  @Prop({ type: Boolean, default: false })
  isHot: boolean;

  @Prop({ type: Boolean, default: false })
  isNew: boolean;

  @Prop({ type: Boolean, default: false })
  isRewardPoint: boolean;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Number, required: true })
  skuMin: number;

  @Prop({ type: Number, required: true })
  skuMax: number;

  @Prop({ type: [String], ref: 'Sku', default: [] })
  skuIds: string[];

  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: Number, default: 0 })
  quantity: number;

  @Prop({ type: String, default: '' })
  nameEn: string;

  @Prop({ type: String, default: '' })
  descriptionEn: string;

  @Prop({ type: String, unique: true, required: true })
  idProductBravo: string;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
//Thêm text index vào schema để hỗ trợ tìm kiếm
ProductSchema.index({ name: 'text', description: 'text' });
