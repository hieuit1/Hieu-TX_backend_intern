import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationType } from '../enum/notification-type.enum';

@Schema({ timestamps: true, versionKey: false, collection: 'notifications' })
export class Notification {
  @Prop({ type: String, ref: 'User', required: true })
  senderId: string;

  @Prop({ type: String, ref: 'User', required: true })
  recipientId: string;

  @Prop({ type: String, enum: NotificationType })
  notificationType: NotificationType;

  @Prop({ type: String })
  entityName: string;

  @Prop({ type: String, required: true })
  entityId: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  thumbnail?: string;

  @Prop({ type: Boolean, default: false })
  isOpened: boolean;

  @Prop({ type: Object, default: {} })
  options: Record<string, any>;

  @Prop({ type: String, default: '' })
  titleEn: string;

  @Prop({ type: String, default: '' })
  descriptionEn: string;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
