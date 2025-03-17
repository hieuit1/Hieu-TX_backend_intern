import { IsString, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'please enter your username' })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'please enter your password' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;

  @IsString({ message: 'Role must be a string' })
  @IsNotEmpty({ message: 'please give role user' })
  role: string; // admin, user, moderator
}
