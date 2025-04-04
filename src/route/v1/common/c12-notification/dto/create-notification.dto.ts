import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { NotificationType } from '../enum/notification-type.enum';

export default class CreateNotificationDto {
  @IsNotEmpty()
  @IsMongoId()
  senderId: string;

  @IsNotEmpty()
  @IsMongoId()
  recipientId: string;

  @IsOptional()
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsOptional()
  @IsMongoId()
  entityId: string;

  @IsOptional()
  @IsObject()
  title: {
    [key: string]: string;
  };

  @IsOptional()
  @IsBoolean()
  isOpened: boolean;

  @IsOptional()
  @IsObject()
  description: {
    [key: string]: string;
  };

  @IsOptional()
  options?: Record<string, any>;

  @IsString()
  @IsOptional()
  entityName?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsString()
  @IsOptional()
  titleEn?: string;

  @IsString()
  @IsOptional()
  descriptionEn?: string;
}
