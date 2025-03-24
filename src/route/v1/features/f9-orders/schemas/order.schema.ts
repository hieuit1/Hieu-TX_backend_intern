import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'orders' })
export class Order {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;

  @Prop({ type: String, ref: 'Discount' })
  discountId?: string;

  @Prop({ type: String, ref: 'ShippingMethod' })
  shippingMethodId?: string;

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ type: String, enum: ['pending', 'processing', 'shipped', 'completed', 'canceled'], default: 'pending' })
  status: string;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
