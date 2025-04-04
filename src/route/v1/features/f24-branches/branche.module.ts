import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import BrancheController from './branche.controller';
import BrancheRepository from './branche.repository';
import BrancheService from './branche.service';
import { Branche, BrancheSchema } from './schemas/branche.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Branche.name,
        schema: BrancheSchema,
      },
    ]),
  ],
  controllers: [BrancheController],
  providers: [BrancheService, BrancheRepository],
  exports: [BrancheService, BrancheRepository],
})
export default class BrancheModule {}
