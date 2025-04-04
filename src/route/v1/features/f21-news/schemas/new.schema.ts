import { LangEnum } from '@enum/lang.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'news' })
export class New {
  @Prop({ type: String, ref: 'User', required: true })
  creatorId: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  thumbnail?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Number, default: 0 })
  viewsCount: number;

  @Prop({ type: String, enum: LangEnum, default: LangEnum.vietnamese })
  lang: LangEnum;
}

export type NewDocument = New & Document;
export const NewSchema = SchemaFactory.createForClass(New);
