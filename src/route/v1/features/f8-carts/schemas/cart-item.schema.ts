import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CartItem {
  @Prop({ type: String, ref: 'Product', required: true })
  productId: string;

  @Prop({ type: String, ref: 'Product', required: true })
  skuId: string;

  @Prop({ type: Number, required: true, min: 1 })
  quantity: number;
}

export type CartItemDocument = CartItem & Document;
export const CartItemSchema = SchemaFactory.createForClass(CartItem);

