import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'products' })
export class Product {
  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: String, ref: 'Category', required: true })
  categoryId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: Number, default: 0})
  price: number;

  @Prop({type :Boolean, default : true})
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
//Thêm text index vào schema để hỗ trợ tìm kiếm
ProductSchema.index({ name: 'text', description: 'text' });
