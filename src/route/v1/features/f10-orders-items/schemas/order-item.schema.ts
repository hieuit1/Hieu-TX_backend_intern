import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'order-items' })
export class OrderItem {
  @Prop({ type: String, ref: 'Order', required: true })
  orderId: string;

  @Prop({ type: String, ref: 'Product', required: true })
  productId: string;

  @Prop({ type: String, ref: 'Sku', required: true })
  skuId: string;

  @Prop({ type: String, ref: 'Discount' })
  discountId?: string;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String })
  note: string;

  @Prop({ type: Number, required: true })
  basePrice: number;

  @Prop({ type: Number, required: true, default: 0 })
  discountAmount: number;

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;
}

export type OrderItemDocument = OrderItem & Document;
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
