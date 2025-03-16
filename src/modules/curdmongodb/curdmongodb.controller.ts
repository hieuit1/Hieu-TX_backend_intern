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
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('products')
export class CurdmongodbController {
  constructor(private readonly mongodbService: CurdmongodbService) {}

  @Post()
  createALLCURDProduct(@Body() createProductDto: CreateProductDto) {
    return this.mongodbService.createALLCURDProduct(
      createProductDto.name,
      createProductDto.description,
      createProductDto.price,
      createProductDto.date,
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
    @Body() updateProductById: UpdateProductDto,
  ) {
    return this.mongodbService.updateProductById(id, updateProductById); // Thêm body vào đây
  }

  @Delete(':id')
  deleteProductById(@Param('id') id: string) {
    return this.mongodbService.deleteProductById(id);
  }
}
