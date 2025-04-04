import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TransactionMethodEnum } from '../enums/transaction-method.enum';
import { TransactionStatusEnum } from '../enums/transaction-status.enum';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import UserBankReceivedDto from './user-bank-revews.dto';
export default class CreateTransactionDto {
  @IsMongoId()
  @IsNotEmpty()
  userFrom: string;

  @IsMongoId()
  @IsOptional()
  userTo?: string;

  @IsOptional()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;

  @IsOptional()
  @IsEnum(TransactionMethodEnum)
  method: TransactionMethodEnum;

  @IsOptional()
  @IsEnum(TransactionStatusEnum)
  status: TransactionStatusEnum;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  money: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  image?: string[];

  @IsString()
  @IsOptional()
  content?: string;

  @ValidateNested({ each: true })
  @Type(() => UserBankReceivedDto)
  @IsOptional()
  userBankReceived?: UserBankReceivedDto;
}
