import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class resetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
