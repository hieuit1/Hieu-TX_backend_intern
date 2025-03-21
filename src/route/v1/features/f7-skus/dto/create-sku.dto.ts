import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AttributeDto } from './attribute.dto';


export default class CreateSkuDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeDto)
  attributes?: AttributeDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
