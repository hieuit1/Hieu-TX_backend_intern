import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShippingInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  fromDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  toDate: Date;
}
