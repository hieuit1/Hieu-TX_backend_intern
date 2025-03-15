import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CurdmongodbService } from './curdmongodb.service';

@Controller('products')
export class CurdmongodbController {
  constructor(private readonly mongodbService: CurdmongodbService) {}

  @Post()
  createALLCURDProduct(
    @Body()
    body: {
      name: string;
      description: string;
      price: number;
      date: string;
    },
  ) {
    return this.mongodbService.createALLCURDProduct(
      body.name,
      body.description,
      body.price,
      body.date,
    );
  }

  // Thêm Pagination & Search
  @Get()
  getALLALLCURDProduct(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
  ) {
    return this.mongodbService.getALLCURDProduct(
      Number(page),
      Number(limit),
      search,
    );
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.mongodbService.getProductById(id);
  }

  @Put(':id')
  updateProductById(
    @Param('id') id: string,
    @Body()
    body: Partial<{
      name: string;
      description: string;
      price: number;
      date: string;
    }>,
  ) {
    return this.mongodbService.updateProductById(id, body); // Thêm body vào đây
  }

  @Delete(':id')
  deleteProductById(@Param('id') id: string) {
    return this.mongodbService.deleteProductById(id);
  }
}
