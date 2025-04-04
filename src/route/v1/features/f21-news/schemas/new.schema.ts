import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LanguageNewEnum } from '../enums/language-new.enum';

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

  @Prop({ type: String, enum: LanguageNewEnum, default: LanguageNewEnum.VI })
  lang: LanguageNewEnum;
}

export type NewDocument = New & Document;
export const NewSchema = SchemaFactory.createForClass(New);
