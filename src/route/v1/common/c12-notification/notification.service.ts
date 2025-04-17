import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import CreateNotificationDto from './dto/create-notification.dto';
import { NotificationTypeDto } from './enum/notification-type.enum';
import NotificationRepository from './notification.repository';
import { NotificationDocument } from './schemas/notification.schema';

@Injectable()
export default class NotificationService extends BaseService<NotificationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly notificationRepository: NotificationRepository,
  ) {
    super(logger, notificationRepository);
  }

  // async sendPurchaseCloverSuccessNotification(
  //   systemAccountId: string,
  //   recipientId: string,
  //   numberClovers: number,
  // ) {
  //   // Initialize title and description objects with correct types
  //   const title: { [key in Language]?: string } = {};
  //   const description: { [key in Language]?: string } = {};

  //   // Populate title and description for each language
  //   languages.forEach((lang) => {
  //     title[lang] = NotificationTrans.purchaseClovers.title[lang];
  //     description[lang] =
  //       NotificationTrans.purchaseClovers.description(numberClovers)[lang];
  //   });

  //   const notificationItem = {
  //     senderId: systemAccountId,
  //     recipientId,
  //     title, // Object containing titles in all languages
  //     description, // Object containing descriptions in all languages
  //   };

  //   await this.notificationRepository.create(notificationItem);
  // }

  // async sendGiftCloverSuccessNotification(
  //   systemAccountId: string,
  //   recipientId: string,
  //   numberClovers: number,
  // ) {
  //   // Initialize title and description objects with correct types
  //   const title: { [key in Language]?: string } = {};
  //   const description: { [key in Language]?: string } = {};

  //   // Populate title and description for each language
  //   languages.forEach((lang) => {
  //     title[lang] = NotificationTrans.giftClovers.title[lang];
  //     description[lang] =
  //       NotificationTrans.giftClovers.description(numberClovers)[lang];
  //   });

  //   const notificationItem = {
  //     senderId: systemAccountId,
  //     recipientId,
  //     title, // Object containing titles in all languages
  //     description, // Object containing descriptions in all languages
  //   };

  //   return await this.notificationRepository.create(notificationItem);
  // }

  // async sendUpgradePremiumNotification(
  //   systemAccountId: string,
  //   recipientId: string,
  // ) {
  //   // Initialize title and description objects with correct types
  //   const title: { [key in Language]?: string } = {};
  //   const description: { [key in Language]?: string } = {};

  //   // Populate title and description for each language
  //   languages.forEach((lang) => {
  //     title[lang] = NotificationTrans.upgradePremium.title[lang];
  //     description[lang] = NotificationTrans.upgradePremium.description[lang];
  //   });

  //   const notificationItem = {
  //     senderId: systemAccountId,
  //     recipientId,
  //     title, // Object containing titles in all languages
  //     description, // Object containing descriptions in all languages
  //   };

  //   return await this.notificationRepository.create(notificationItem);
  // }

  // async readNotification(notificationId: string) {
  //   // Check notification is exist
  //   const notification = await this.notificationRepository.findOneById(
  //     notificationId,
  //   );

  //   if (!notification) {
  //     throw new Error('Notification not found');
  //   }

  //   const updatedNotification = await this.notificationRepository.updateOneById(
  //     notificationId,
  //     {
  //       isOpened: true,
  //     },
  //   );

  //   return updatedNotification;
  // }

  async readNotification(notificationId: string) {
    // Check notification is exist
    const notification = await this.notificationRepository.findOneById(
      notificationId,
    );
    if (!notification) {
      throw new Error('Notification not found');
    }

    // Check notification is opened
    if (notification.isOpened) {
      throw new Error('Notification already opened');
    }
    // Update notification to opened
    const updatedNotification = await this.notificationRepository.updateOneById(
      notificationId,
      {
        isOpened: true,
      },
    );
    return updatedNotification;
  }

  async sendNotification(
    recipientId: string,
    senderId: string,
    type: NotificationTypeDto,
  ) {
    const dataNotification: CreateNotificationDto = {
      senderId,
      recipientId,
      type,
      title: {
        vi: this.getNotificationTitle(type),
      },
      description: {
        vi: this.getNotificationDescription(type),
      },
      isOpened: false,
    };

    return this.notificationRepository.create(dataNotification);
  }
  private getNotificationTitle(type: NotificationTypeDto): any {
    const titles: Partial<Record<NotificationTypeDto, string>> = {
      [NotificationTypeDto.order_success]: 'Đặt hàng thành công!',
      [NotificationTypeDto.shipper_confirm]: 'Tài xế đã xác nhận đơn hàng!',
      [NotificationTypeDto.delivering]: 'Đơn hàng đang được giao!',
      [NotificationTypeDto.delivery_success]: 'Giao hàng thành công!',
      [NotificationTypeDto.referral_success]: 'Giới thiệu thành công!',
      [NotificationTypeDto.receive_point]: 'Bạn nhận được điểm thưởng!',
      [NotificationTypeDto.voucher_new]: 'Bạn có mã ưu đãi mới!',
      [NotificationTypeDto.new_order_for_shipper]: 'Có đơn hàng mới!',
    };
    return titles[type] || 'Bạn có thông báo mới!';
  }

  private getNotificationDescription(type: NotificationTypeDto): any {
    const descriptions: Partial<Record<NotificationTypeDto, string>> = {
      [NotificationTypeDto.order_success]:
        'Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý!',
      [NotificationTypeDto.shipper_confirm]:
        'Tài xế đã nhận đơn hàng và chuẩn bị giao!',
      [NotificationTypeDto.delivering]: 'Tài xế đang giao hàng đến bạn!',
      [NotificationTypeDto.delivery_success]:
        'Đơn hàng của bạn đã giao thành công!',
      [NotificationTypeDto.referral_success]:
        'Bạn vừa giới thiệu thành công một người bạn!',
      [NotificationTypeDto.receive_point]: 'Bạn vừa nhận được điểm từ bạn bè!',
      [NotificationTypeDto.voucher_new]: 'Có mã ưu đãi mới dành cho bạn!',
      [NotificationTypeDto.new_order_for_shipper]:
        'Có đơn hàng mới đang chờ tài xế!',
    };
    return descriptions[type] || 'chi tiết đơn hàng chưa có';
  }
}
