import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export default class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  shopId: string;

  @IsMongoId()
  @IsNotEmpty()
  discountId?: string;

  @IsOptional()
  @IsString()
  shippingMethodId?: string;

  @IsOptional()
  @IsNumber()
  totalAmount: number;

  @IsOptional()
  @IsEnum(['pending', 'processing', 'shipped', 'completed', 'canceled'])
  status?: string;
}
