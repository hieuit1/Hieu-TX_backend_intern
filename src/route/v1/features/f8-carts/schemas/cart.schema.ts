import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import AddItemDto from '../dto/add-item.dto';

@Schema({ timestamps: true, versionKey: false, collection: 'carts' })
export class Cart {
  @Prop({ type: String, ref: 'Customer', required: true })
  customerId: string;

  @Prop([
    {
      type: {
        productId: { type: String, ref: 'Product' },
        skuId: { type: String, ref: 'Sku' },
        discountId: { type: String, ref: 'Discount' },
        quantity: Number,
      },
    },
  ])
  items: AddItemDto[];
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);
