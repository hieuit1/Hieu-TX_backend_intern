import { IsNotEmpty, IsString } from 'class-validator';

export default class UserBankReceivedDto {
  @IsString()
  @IsNotEmpty()
  userBankId: string;

  @IsString()
  @IsNotEmpty()
  bankName: string;

  @IsString()
  @IsNotEmpty()
  accountName: string;

  @IsString()
  @IsNotEmpty()
  accountNumber: string;
}
