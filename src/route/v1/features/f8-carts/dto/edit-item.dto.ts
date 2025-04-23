import { IsBoolean, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export default class EditItemDto {
  @IsMongoId()
  skuId: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  isSelected?: boolean;
}
