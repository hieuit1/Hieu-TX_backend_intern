import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import NewRepository from './new.repository';
import { NewDocument } from './schemas/new.schema';

@Injectable()
export default class NewService extends BaseService<NewDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly newRepository: NewRepository,
  ) {
    super(logger, newRepository);
  }
}
