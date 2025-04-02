import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateShopDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  banner?: string;

  @IsString()
  @IsNotEmpty()
  socialPhone: string;

  @IsEmail()
  @IsNotEmpty()
  socialEmail: string;

  @IsString()
  @IsNotEmpty()
  provinceId: string;

  @IsString()
  @IsNotEmpty()
  districtId: string;

  @IsString()
  @IsNotEmpty()
  villageId: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  totalRatings?: number;

  @IsOptional()
  @IsNumber()
  totalReviews?: number;

  @IsOptional()
  @IsNumber()
  totalProducts?: number;
}
