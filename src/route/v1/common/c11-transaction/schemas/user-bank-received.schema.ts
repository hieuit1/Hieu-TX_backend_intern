import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false }) // Không tạo _id cho sub-doc
export class UserBankReceived {
  @Prop({ type: String, ref: 'UserBank', required: true })
  userBankId: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  accountName: string;

  @Prop({ required: true })
  accountNumber: string;
}

export const UserBankReceivedSchema =
  SchemaFactory.createForClass(UserBankReceived);
