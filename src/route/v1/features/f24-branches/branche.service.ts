import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';
import BrancheRepository from './branche.repository';
import { BrancheDocument } from './schemas/branche.schema';

@Injectable()
export default class BrancheService extends BaseService<BrancheDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly brancheRepository: BrancheRepository,
  ) {
    super(logger, brancheRepository);
  }
}
