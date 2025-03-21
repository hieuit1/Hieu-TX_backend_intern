import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema()
export class CartItem {
  @Prop({ type: ObjectId, ref: 'Product', required: true })
  productId: ObjectId;

  @Prop({ type: ObjectId, ref: 'Product', required: true })
  skuId: ObjectId;

  @Prop({ type: Number, required: true, min: 1 })
  quantity: number;
}

export type CartItemDocument = CartItem & Document;
export const CartItemSchema = SchemaFactory.createForClass(CartItem);

