import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import FlashSaleController from './flash-sale.controller';
import FlashSaleRepository from './flash-sale.repository';
import FlashSaleService from './flash-sale.service';
import { FlashSale, FlashSaleSchema } from './schemas/flash-sale.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FlashSale.name,
        schema: FlashSaleSchema,
      },
    ]),
  ],
  controllers: [FlashSaleController],
  providers: [FlashSaleService, FlashSaleRepository],
  exports: [FlashSaleService, FlashSaleRepository],
})
export default class FlashSaleModule {}
