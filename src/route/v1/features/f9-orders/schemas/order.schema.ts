import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderPaymentMethod } from '../enums/order-payment-method.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { ShippingInfo, ShippingInfoSchema } from './shipping-info.schame';
import { StatusHistory, StatusHistorySchema } from './statushistory.schema';

@Schema({ timestamps: true, versionKey: false, collection: 'orders' })
export class Order {
  @Prop({ type: String, ref: 'User', required: true })
  orderBy: string;

  @Prop({
    type: {
      note: { type: String, required: false },
      contactName: { type: String, required: true },
      contactPhone: { type: String, required: true },
    },

    required: true,
  })
  contact: {
    note?: string;
    contactName: string;
    contactPhone: string;
  };

  @Prop({ type: String, ref: 'UserAddress', required: true })
  userAddressId: string;

  @Prop({ type: String, ref: 'Province', required: true })
  provinceId: string;

  @Prop({ type: String, ref: 'District', required: true })
  districtId: string;

  @Prop({ type: String, ref: 'Village', required: true })
  villageId: string;

  @Prop({ type: String, required: true })
  street: string;

  @Prop({ type: String, required: true })
  addressFull: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: String, enum: OrderPaymentMethod, required: true })
  paymentMethod: OrderPaymentMethod;

  @Prop({ type: String, required: true })
  paymentInfo: string;

  @Prop({ type: String, ref: 'Voucher', required: false })
  shopVoucherId: string;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.watting })
  status: OrderStatus;

  @Prop({
    type: {
      subTotal: { type: Number, required: true },
      shippingCost: { type: Number, required: true },
      discountAmount: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
    },
    required: true,
  })
  checkout: {
    totalAmount: number;
    shippingCost: number;
    subTotal: number; // tong tien sp
    discountAmount: number; // tong tien giam gia
  };

  @Prop({ type: [StatusHistorySchema], default: [] })
  statusHistories: StatusHistory[];

  @Prop({ type: ShippingInfoSchema, required: true })
  shippingInfo: ShippingInfo;

  @Prop({ type: String, ref: 'Shop', required: true })
  shopId: string;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
