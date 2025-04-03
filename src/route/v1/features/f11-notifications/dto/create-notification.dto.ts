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

  @IsNotEmpty()
  @IsEnum(NotificationType)
  notificationType: NotificationType;

  @IsString()
  @IsOptional()
  entityName?: string;

  @IsMongoId()
  @IsNotEmpty()
  entityId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsBoolean()
  isOpened?: boolean;

  @IsOptional()
  @IsObject()
  options?: Record<string, any>;

  @IsString()
  @IsOptional()
  titleEn?: string;

  @IsString()
  @IsOptional()
  descriptionEn?: string;
}
