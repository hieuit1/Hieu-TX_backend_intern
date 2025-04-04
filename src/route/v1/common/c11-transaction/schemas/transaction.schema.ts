import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TransactionMethodEnum } from '../enums/transaction-method.enum';
import { TransactionStatusEnum } from '../enums/transaction-status.enum';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import {
  UserBankReceived,
  UserBankReceivedSchema,
} from './user-bank-received.schema';

export interface MultipleLanguage {
  [key: string]: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Transaction {
  @Prop({ type: String, ref: 'User', required: true })
  readonly userFrom: string;

  @Prop({ type: String, ref: 'User' })
  userTo?: string;

  @Prop({
    type: String,
    enum: TransactionTypeEnum,
    default: TransactionTypeEnum.WITHDRAW,
  })
  readonly type: TransactionTypeEnum;

  @Prop({
    type: String,
    enum: TransactionMethodEnum,
    default: TransactionMethodEnum.TRANSFER,
  })
  readonly method: TransactionMethodEnum;

  @Prop({
    type: String,
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.PENDING,
  })
  readonly status: TransactionStatusEnum;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Number, required: true })
  money: number;

  @Prop({ type: [String] })
  image?: string[];

  @Prop({ type: String })
  content?: string;

  @Prop({
    type: UserBankReceivedSchema,
  })
  userBankReceived: UserBankReceived;
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
