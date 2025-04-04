import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateVillageDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly provinceId: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly districtId: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @IsString()
  @IsOptional()
  type?: string;
}
