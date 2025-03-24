import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'categories' })
export class Category {

  @Prop({ type: String, ref: 'Category', default: null })
  parentId: string | null;

  @Prop({ type: String, required: true })
  name: string;

}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
