import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas/notification.schema';
import NotificationController from './notification.controller';
import NotificationRepository from './notification.repository';
import NotificationService from './notification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService, NotificationRepository],
})
export default class NotificationModule {}
