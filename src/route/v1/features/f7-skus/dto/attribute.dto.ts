import { IsNotEmpty, IsString } from 'class-validator';

export class AttributeDto {
  @IsString()
  @IsNotEmpty()
  attributeId: string;

  @IsString()
  @IsNotEmpty()
  attributeName: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
