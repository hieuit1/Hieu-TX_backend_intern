import { IsString } from 'class-validator';

export class SelectedAttributeDto {
  @IsString()
  attributeName: string;

  @IsString()
  value: string;
}
