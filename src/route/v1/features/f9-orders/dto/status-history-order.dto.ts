import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';

export class StatusHistoryDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  changedAt: Date;

  @IsMongoId()
  @IsNotEmpty()
  changedBy: string;

  @IsString()
  @IsNotEmpty()
  changeReason: string;

  @IsArray()
  @IsOptional()
  changeImages?: string[];
}
