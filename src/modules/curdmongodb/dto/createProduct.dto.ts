import { IsDateString, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'pls enter a valid name' })
  @Length(6, 50, {
    message: 'name length Must be between 6 and 50 charcters',
  })
  name: string;

  @IsString({ message: 'vui long nhap ' })
  @Length(6, 50, {
    message: 'Password length Must be between 6 and 50 charcters',
  })
  description: string;

  @IsNumber({}, { message: 'vui long nhap so' })
  price: number;

  @IsDateString()
  date: string;
}
