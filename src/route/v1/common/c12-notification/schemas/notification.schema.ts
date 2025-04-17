import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { NotificationTypeDto } from '../enum/notification-type.enum';

@Schema({ timestamps: true, versionKey: false })
export class Notification {
  @Prop({ type: String, ref: 'User' })
  senderId: string;

  @Prop({ type: String, ref: 'User' })
  recipientId: string;

  @Prop({
    type: String,
    enum: NotificationTypeDto,
    required: true,
  })
  type: NotificationTypeDto;

  @Prop({ type: String })
  entityId: string;

  @Prop({
    type: Object,
    default: {
      vi: '',
      en: '',
      ko: '',
      ja: '',
    },
  })
  title: {
    [key: string]: string;
  };

  @Prop({ type: Boolean, default: false })
  isOpened: boolean;

  @Prop({
    type: Object,
    default: {
      vi: '',
      en: '',
      ko: '',
      ja: '',
    },
  })
  description: {
    [key: string]: string;
  };

  @Prop({ type: String, default: '' })
  thumbnail: string;

  @Prop({ type: String })
  entityName: string;

  @Prop({ type: Object, default: {} })
  options: Record<string, any>;

  @Prop({ type: String, default: '' })
  titleEn: string;

  @Prop({ type: String, default: '' })
  descriptionEn: string;
}

export type NotificationDocument = HydratedDocument<Notification>;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
