import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'discounts' })
export class Discount {
  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: String, enum: ['percentage', 'fixed'], required: true })
  discountType: string;

  @Prop({ type: String, require: true })
  code: string;

  @Prop({ type: Number, default: 0 })
  discountValue: number;

  @Prop({ type: Number, default: 0 })
  minOrderValue: number;

  @Prop({ type: Number, default: 0 })
  maxOrderValue: number;

  @Prop({ type: Number, default: 0 })
  maxDiscount: number;

  @Prop({ type: Date, default: Date.now })
  startDate: Date;

  @Prop({ type: Date, default: Date.now })
  endDate: Date;
}

export type DiscountDocument = Discount & Document;
export const DiscountSchema = SchemaFactory.createForClass(Discount);
