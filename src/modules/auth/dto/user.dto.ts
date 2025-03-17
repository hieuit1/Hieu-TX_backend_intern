import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username không được để trống' })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Role không được để trống' })
  role: string;
}
