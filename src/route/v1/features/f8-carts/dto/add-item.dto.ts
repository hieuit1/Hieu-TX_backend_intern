import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export default class AddItemDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @IsNotEmpty()
  @IsMongoId()
  skuId: string;

  @IsOptional()
  @IsMongoId()
  discountId?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
