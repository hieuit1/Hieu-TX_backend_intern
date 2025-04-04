import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateProvinceDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly slug?: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
