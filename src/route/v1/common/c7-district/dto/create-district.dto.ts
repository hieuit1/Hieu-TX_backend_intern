import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export default class CreateDistrictDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly provinceId: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly slug: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;
}
