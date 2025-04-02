import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'shops' })
export class Shop {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, default: '' })
  avatar: string;

  @Prop({ type: String, default: '' })
  banner: string;

  @Prop({ type: String, required: true })
  socialPhone: string;

  @Prop({ type: String, required: true })
  socialEmail: string;

  @Prop({ type: String, ref: 'Province', required: true })
  provinceId: string;

  @Prop({ type: String, ref: 'District', required: true })
  districtId: string;

  @Prop({ type: String, ref: 'Village', required: true })
  villageId: string;

  @Prop({ type: String, default: '' })
  street: string;

  @Prop({ type: String, default: '' })
  location: string;

  @Prop({ type: Number, default: 0 })
  totalRatings: number;

  @Prop({ type: Number, default: 0 })
  totalReviews: number;

  @Prop({ type: Number, default: 0 })
  totalProducts: number;
}

export type ShopDocument = Shop & Document;
export const ShopSchema = SchemaFactory.createForClass(Shop);
