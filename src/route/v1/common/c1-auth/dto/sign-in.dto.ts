import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export default class SignInDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @Length(6, 50)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @MinLength(12)
  deviceID?: string;
}
