import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import WarrantyDto from './warranty-product.dto';

export default class CreateProductDto {
  @IsMongoId()
  @IsNotEmpty()
  creatorId: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categoryIds?: string[];

  @IsMongoId()
  @IsNotEmpty()
  brandId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WarrantyDto)
  warranties?: WarrantyDto[];

  @IsOptional()
  @IsNumber()
  viewsCount?: number;

  @IsOptional()
  @IsNumber()
  soldCount?: number;

  @IsOptional()
  @IsNumber()
  reviewsCount?: number;

  @IsOptional()
  @IsNumber()
  totalRatings?: number;

  @IsOptional()
  @IsNumber()
  likedCount?: number;

  @IsOptional()
  @IsBoolean()
  isHot?: boolean;

  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @IsOptional()
  @IsBoolean()
  isRewardPoint?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsNumber()
  @IsNotEmpty()
  skuMin: number;

  @IsNumber()
  @IsNotEmpty()
  skuMax: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  skuIds?: string[];

  @IsMongoId()
  @IsNotEmpty()
  shopId: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  nameEn?: string;

  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @IsNotEmpty()
  @IsString()
  idProductBravo: string;
}
