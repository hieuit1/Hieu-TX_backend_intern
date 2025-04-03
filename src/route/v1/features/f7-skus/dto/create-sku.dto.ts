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
import { AttributeDto } from './attribute.dto';

export default class CreateSkuDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  skuCode: string;

  @IsNumber()
  @IsNotEmpty()
  originalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  basePrice: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AttributeDto)
  attributes?: AttributeDto[];

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  soldCount?: number;

  @IsArray()
  @IsOptional()
  image?: string[];
}
