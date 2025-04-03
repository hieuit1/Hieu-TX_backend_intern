import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateOrderItemDto {
  @IsMongoId()
  @IsNotEmpty()
  orderId: string;

  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsMongoId()
  @IsNotEmpty()
  skuId: string;

  @IsMongoId()
  @IsOptional()
  discountId?: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsOptional()
  note?: string;

  @IsNumber()
  @IsNotEmpty()
  basePrice: number;

  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsMongoId()
  @IsNotEmpty()
  shopId: string;
}
