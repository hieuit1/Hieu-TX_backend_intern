import { Module } from '@nestjs/common';
import { CurdmongodbService } from './curdmongodb.service';
import { CurdmongodbController } from './curdmongodb.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CurdmongodbSchema } from './curdmongodb.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Curdmongodb', schema: CurdmongodbSchema },
    ]),
  ],
  providers: [CurdmongodbService],
  controllers: [CurdmongodbController],
})
export class CurdmongodbModule {}
