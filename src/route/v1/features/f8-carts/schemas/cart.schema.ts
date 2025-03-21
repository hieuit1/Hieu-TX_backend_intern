import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { CartItem, CartItemSchema } from './cart-item.schema';

@Schema({ timestamps: true, versionKey: false, collection: 'carts' })
export class Cart {
  @Prop({ type: ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop({type : [CartItemSchema], default : []})
  items: CartItem[];

}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);
