import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus } from '../enums/order-status.enum';

@Schema({ _id: false })
export class StatusHistory {
  @Prop({ type: String, enum: OrderStatus, required: true })
  status: OrderStatus;

  @Prop({ type: Date, required: true })
  changedAt: Date;

  @Prop({ type: String, required: true })
  changedBy: string;

  @Prop({ type: String, required: true })
  changeReason: string;

  @Prop({ type: [String], default: [] })
  changeImages: string[];
}

export type StatusHistoryDocument = StatusHistory & Document;
export const StatusHistorySchema = SchemaFactory.createForClass(StatusHistory);
