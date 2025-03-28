import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';

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

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.Pending })
  status: OrderStatus;

  checkout: {
    totalAmount: number;
    shippingCost: number;
    subTotal: number; // tong tien sp
    discountAmount: number; // tong tien giam gia
  };
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
