import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LanguageNewEnum } from '../enums/language-new.enum';

export default class CreateNewDto {
  @IsMongoId()
  @IsNotEmpty()
  creatorId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsOptional()
  viewsCount?: number;

  @IsString()
  @IsEnum(LanguageNewEnum)
  @IsOptional()
  lang?: LanguageNewEnum;
}
