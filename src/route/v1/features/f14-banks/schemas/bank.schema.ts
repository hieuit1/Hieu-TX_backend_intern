import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'tests' })
export class Bank {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  shortName: string;

  @Prop({ type: String, required: true })
  branch: string;

  @Prop({ type: String })
  thumbnail?: string;

  @Prop({ type: Boolean, default: true })
  isShow: boolean;
}

export type BankDocument = Bank & Document;
export const BankSchema = SchemaFactory.createForClass(Bank);
