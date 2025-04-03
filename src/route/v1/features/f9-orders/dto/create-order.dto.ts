import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderPaymentMethod } from '../enums/order-payment-method.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { CheckoutDto } from './checkout-order.dto';
import { ContractDto } from './contract.dto';
import { ShippingInfoDto } from './shipping-info.dto';
import { StatusHistoryDto } from './status-history-order.dto';

export default class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  orderBy: string;

  @IsNotEmpty()
  contact: ContractDto;

  @IsMongoId()
  @IsNotEmpty()
  userAddressId: string;

  @IsMongoId()
  @IsNotEmpty()
  provinceId: string;

  @IsMongoId()
  @IsNotEmpty()
  districtId: string;

  @IsMongoId()
  @IsNotEmpty()
  villageId: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  addressFull: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(OrderPaymentMethod)
  @IsNotEmpty()
  paymentMethod: OrderPaymentMethod;

  @IsString()
  @IsNotEmpty()
  paymentInfo: string;

  @IsMongoId()
  @IsOptional()
  shopVoucherId?: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ValidateNested()
  @Type(() => ShippingInfoDto)
  shippingInfo: ShippingInfoDto;

  @ValidateNested({ each: true })
  @Type(() => StatusHistoryDto)
  @IsArray()
  statusHistories: StatusHistoryDto[];

  @ValidateNested()
  @Type(() => CheckoutDto)
  @IsNotEmpty()
  checkout: CheckoutDto;

  @IsMongoId()
  @IsNotEmpty()
  shopId: string;
}
