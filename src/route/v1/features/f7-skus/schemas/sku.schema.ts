import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AttributeDto } from '../dto/attribute.dto';

@Schema({ timestamps: true, versionKey: false, collection: 'skus' })
export class Sku {
  @Prop({ type: String, ref: 'Product', required: true })
  productId: string;

  @Prop({ type: String, required: true, unique: true })
  skuCode: string;

  @Prop({ type: Number, required: true })
  originalPrice: number;

  @Prop({ type: Number, required: true })
  basePrice: number;

  @Prop({
    type: [
      {
        attributeId: { type: String, required: true },
        attributeName: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    default: [],
  })
  attributes: AttributeDto[];

  @Prop({ type: Number, required: true, default: 0 })
  quantity: number;

  @Prop({ type: String, required: true })
  thumbnail: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0 })
  soldCount: number;

  @Prop({ type: [String], default: [] })
  image: string[];
}

export type SkuDocument = Sku & Document;
export const SkuSchema = SchemaFactory.createForClass(Sku);
