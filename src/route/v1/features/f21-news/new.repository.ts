import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { New, NewDocument } from './schemas/new.schema';

@Injectable()
export default class NewRepository extends BaseRepository<NewDocument> {
  constructor(@InjectModel(New.name) model: PaginateModel<NewDocument>) {
    super(model);
  }
}
