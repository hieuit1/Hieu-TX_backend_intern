import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export default class AddItemDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @IsNotEmpty()
  @IsMongoId()
  skuId: string;

  @IsNotEmpty()
  @IsMongoId()
  discountId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
