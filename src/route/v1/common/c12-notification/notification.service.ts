import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

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
}
