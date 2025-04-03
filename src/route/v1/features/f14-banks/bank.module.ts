import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import BankController from './bank.controller';
import BankRepository from './bank.repository';
import BankService from './bank.service';
import { Bank, BankSchema } from './schemas/bank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bank.name,
        schema: BankSchema,
      },
    ]),
  ],
  controllers: [BankController],
  providers: [BankService, BankRepository],
  exports: [BankService, BankRepository],
})
export default class BankModule {}
