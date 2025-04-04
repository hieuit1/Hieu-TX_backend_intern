import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Branche, BrancheDocument } from './schemas/branche.schema';

@Injectable()
export default class BrancheRepository extends BaseRepository<BrancheDocument> {
  constructor(
    @InjectModel(Branche.name) model: PaginateModel<BrancheDocument>,
  ) {
    super(model);
  }
}
