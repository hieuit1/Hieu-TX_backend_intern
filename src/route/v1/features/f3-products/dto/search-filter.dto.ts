import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchFilterDto {
  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsString()
  brandName?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice: number;
}
