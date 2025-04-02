import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TimeType, WarrantyType } from '../enum/warranty.enums';

@Schema({ _id: false })
export class Warranty {
  @Prop({ type: String, required: true })
  skuId: string;

  @Prop({ type: Number, required: true })
  duration: number;

  @Prop({ type: String, enum: TimeType, required: true })
  timeType: TimeType;

  @Prop({ type: String, enum: WarrantyType, required: true })
  warrantyType: WarrantyType;
}

export type WarrantyDocument = Warranty & Document;
export const WarrantySchema = SchemaFactory.createForClass(Warranty);
