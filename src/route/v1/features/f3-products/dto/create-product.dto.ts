import { IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export default class CreateProductDto {
  @IsMongoId()
  @IsNotEmpty()
  shopId: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsBoolean()
  isActive: boolean
}
