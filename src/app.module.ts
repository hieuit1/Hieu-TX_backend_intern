import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { CurdmongodbModule } from './modules/curdmongodb/curdmongodb.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/intern-backend', {
      maxPoolSize: 20, // Tăng số lượng kết nối đồng thời lên 20
    }),
    UsersModule,
    CurdmongodbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
