import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export default class EditItemDto {
  @IsMongoId()
  productId: string;

  @IsMongoId()
  skuId: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
