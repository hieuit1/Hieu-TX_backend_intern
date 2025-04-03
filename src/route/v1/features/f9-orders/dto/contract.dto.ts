import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContractDto {
  @IsOptional()
  @IsString()
  note?: string;

  @IsNotEmpty()
  @IsString()
  contactName: string;

  @IsNotEmpty()
  @IsString()
  contactPhone: string;
}
