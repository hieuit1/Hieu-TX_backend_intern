import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';


export default class CreateShopDto {
  @IsMongoId()
  @IsNotEmpty()
  ownerId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
