import {IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateNotificationDto {
  @IsNotEmpty()
  @IsMongoId()
  senderId: string;

  @IsNotEmpty()
  @IsMongoId()
  recipientId: string;

  @IsOptional() 
  @IsString()
  notificationType?: string;

  @IsOptional() 
  @IsString()
  entityName?: string; 

  @IsNotEmpty()
  @IsMongoId()
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
  options?: Record<string, any>;
}
