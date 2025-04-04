import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import NewController from './new.controller';
import NewRepository from './new.repository';
import NewService from './new.service';
import { New, NewSchema } from './schemas/new.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: New.name,
        schema: NewSchema,
      },
    ]),
  ],
  controllers: [NewController],
  providers: [NewService, NewRepository],
  exports: [NewService, NewRepository],
})
export default class NewModule {}
