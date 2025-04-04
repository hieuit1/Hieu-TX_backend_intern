import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Village {
  @Prop({
    type: String,
    ref: 'Province',
    required: true,
  })
  provinceId: string;

  @Prop({
    type: String,
    ref: 'District',
    required: true,
  })
  districtId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  type?: string;

  @Prop({ type: String })
  slug: string;
}

export type VillageDocument = Village & Document;
export const VillageSchema = SchemaFactory.createForClass(Village);
