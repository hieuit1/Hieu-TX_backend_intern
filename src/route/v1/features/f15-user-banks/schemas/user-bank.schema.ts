import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false, collection: 'userBanks' })
export class UserBank {
  @Prop({ type: String, ref: 'User', required: true })
  userId: string;

  @Prop({ type: String, ref: 'Bank', required: true })
  bankId: string;

  @Prop({ type: String, required: true })
  accountName: string;

  @Prop({ type: String, required: true, unique: true })
  accountNumber: string;

  @Prop({ type: String, required: true })
  holder: string;

  @Prop({ type: String, required: true })
  passport: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  expirationDate: string;

  @Prop({ type: String, required: true })
  ccv: string;

  @Prop({ type: Boolean, default: false })
  isStoreBank: boolean;
}

export type UserBankDocument = UserBank & Document;
export const UserBankSchema = SchemaFactory.createForClass(UserBank);
