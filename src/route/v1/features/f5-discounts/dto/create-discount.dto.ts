import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApplyTo } from '../enum/apply-to.enum';
import { DiscountType } from '../enum/discount-type.enum';
import { BulkDiscountDto } from './bulk-discountDto.discount.dto';

export default class CreateDiscountDto {
  @IsMongoId()
  @IsNotEmpty()
  catertorId: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @IsNumber()
  @IsNotEmpty()
  discountValue: number;

  @IsNumber()
  @IsOptional()
  maxDiscountValue?: number;

  @IsNumber()
  @IsNotEmpty()
  validFrom: number; // thời gian bắt đầu

  @IsNumber()
  @IsNotEmpty()
  validTo: Number; // thời gian kết thúc

  @IsNumber()
  @IsOptional()
  maxUses?: number;

  @IsArray()
  @IsOptional()
  usersUsed?: string[];

  @IsNumber()
  @IsOptional()
  maxUsesPerUserser?: number;

  @IsNumber()
  @IsNotEmpty()
  minOrderValue: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsNotEmpty()
  @IsEnum(ApplyTo)
  applyTo: ApplyTo;

  @IsArray()
  @IsOptional()
  productIds?: string[];

  @IsArray()
  @IsOptional()
  skuIds?: string;

  @IsBoolean()
  @IsOptional()
  isSendNotification?: boolean;

  @IsString()
  @IsOptional()
  nameEn?: string;

  @IsString()
  @IsOptional()
  descriptionEn?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BulkDiscountDto)
  bulkDiscount?: BulkDiscountDto[];
}
