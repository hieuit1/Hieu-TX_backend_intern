import HistoryService from '@common/c9-history/history.service';
import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Types } from 'mongoose';
import CreateProductDto from './dto/create-product.dto';
import { SearchFilterDto } from './dto/search-filter.dto';
import UpdateProductDto from './dto/update-product.dto';
import ProductService from './product.service';

@ApiTags('Products')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly historyService: HistoryService,
  ) {}

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(@Query() query: any): Promise<any> {
    const result = await this.productService.findManyBy(query);
    return result;
  }

  /**
   * Create
   *
   * @param body
   * @returns
   */
  @Post('')
  @HttpCode(201)
  async create(@Body() body: CreateProductDto): Promise<any> {
    const result = await this.productService.create(body);

    return result;
  }

  /**
   * Update by ID
   *
   * @param id
   * @param body
   * @returns
   */
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() body: UpdateProductDto,
  ): Promise<any> {
    const result = await this.productService.updateOneById(id, body);

    return result;
  }

  /**
   * Delete hard many by ids
   *
   * @param ids
   * @returns
   */
  @Delete(':ids/ids')
  // @HttpCode(204)
  async deleteManyByIds(@Param('ids') ids: string): Promise<any> {
    const result = await this.productService.deleteManyHardByIds(
      ids.split(',').map((item: any) => new Types.ObjectId(item)),
    );
    return result;
  }

  /**
   * Delete by ID
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  // @HttpCode(204)
  async delete(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const result = await this.productService.deleteOneHardById(id);

    return result;
  }

  @Get(':productId/detail-product')
  @HttpCode(200)
  async getMyCart(@Param('productId') productId: string) {
    // @GetCurrentUserId() userId: string
    return this.productService.detailProduct(productId);
  }

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(
    @ApiQueryParams() query: AqpDto,
    /* @Query('userId') userId: string,*/
  ): Promise<any> {
    //search product
    const search = query.filter?.search?.trim();
    if (search) {
      delete query.filter.search;
      if (search) {
        query.filter = {
          ...query.filter,
          $text: {
            $search: search,
            $diacriticSensitive: true,
            $language: 'english',
          }, // Full-text search
        };
        query.projection = {
          ...query.projection,
          score: { $meta: 'textScore' },
        };
      }

      // save history when search product
      await this.historyService.create({
        method: 'GET',
        action: 'SEARCH',
        url: search,
        // idUser: userId,
      });
    }

    return this.productService.paginate(query);
  }

  @Get('filter')
  filter(@Query() filterDto: SearchFilterDto) {
    return this.productService.filterProducts(filterDto);
  }

  @Get('search-history')
  @HttpCode(200)
  async getSearchHistory(): Promise<any> {
    const history = await this.historyService.findManyBy(
      { action: 'SEARCH' },
      {
        projection: { url: 1, _id: 0 },
        sort: { createdAt: -1 },
      },
    );

    const uniqueUrls: string[] = [];
    const seen = new Set<string>();

    for (const item of history) {
      const url = item.url?.trim();
      if (url && !seen.has(url)) {
        seen.add(url);
        uniqueUrls.push(url);
      }

      if (uniqueUrls.length >= 10) break; // Limit to 10 unique URLs
    }

    return uniqueUrls;
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get('/one')
  @HttpCode(200)
  async findOneBy(
    @ApiQueryParams() { filter, projection }: AqpDto,
  ): Promise<any> {
    return this.productService.findOneBy(filter, {
      filter,
      projection,
    });
  }

  /**
   * Find one by ID
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @HttpCode(200)
  async findOneById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @ApiQueryParams('population') populate: AqpDto,
  ): Promise<any> {
    const result = await this.productService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
