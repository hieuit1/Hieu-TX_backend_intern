import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TimeType, WarrantyType } from '../enum/warranty.enums';

export default class WarrantyDto {
  @IsString()
  @IsNotEmpty()
  skuId: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  timeType: TimeType;

  @IsString()
  @IsNotEmpty()
  warrantyType: WarrantyType;
}
