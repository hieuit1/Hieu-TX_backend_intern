import { LangEnum } from '@enum/lang.enum';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsEnum(LangEnum)
  @IsOptional()
  lang?: LangEnum;
}
