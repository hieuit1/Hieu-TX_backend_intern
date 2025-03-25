import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import {
  BadRequestException,
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
import CartService from './cart.service';
import CreateCartDto from './dto/create-cart.dto';
import { RemoveItemDto } from './dto/remove-item-cart.dto';
import UpdateCartDto from './dto/update-cart.dto';

@ApiTags('Carts')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('total/:userId')
  @HttpCode(200)
  async totalCart(
    @Param('userId') userId: string,
    @Query() query: any,
  ): Promise<any> {
    const result = await this.cartService.totalCart(userId, query.filter);
    return result;
  }

  /**
   * Find all
   *
   * @param query
   * @returns
   */
  @Get('')
  @HttpCode(200)
  async findAll(
    @Query() { filter, population, ...option }: AqpDto,
  ): Promise<any> {
    console.log(population);
    const result = await this.cartService.findManyBy(filter);
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
  async create(@Body() body: CreateCartDto): Promise<any> {
    const result = await this.cartService.create(body);

    return result;
  }

  /**
   * Add to cart
   *
   * @param body
   * @returns
   */
  @Post('add-to-cart')
  @HttpCode(200)
  async addToCart(
    @Body() body: { userId: string; items: CreateCartDto['items'] },
  ) {
    if (!body.userId) throw new BadRequestException('User ID is required');

    return this.cartService.addToCart(body.userId, body.items);
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
    @Body() body: UpdateCartDto,
  ): Promise<any> {
    const result = await this.cartService.updateOneById(id, body);

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
    const result = await this.cartService.deleteManyHardByIds(
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
    const result = await this.cartService.deleteOneHardById(id);

    return result;
  }

  @Delete('remove-from-cart/:userId/:skuId')
  async removeFromCart(@Param() removeItemDto: RemoveItemDto) {
    console.log('RemoveItemDto:', removeItemDto);
    return this.cartService.removeFromCart(
      removeItemDto.userId,
      removeItemDto.skuId,
    );
  }

  /**
   * Paginate
   *
   * @param query
   * @returns
   */
  @Get('paginate')
  @HttpCode(200)
  async paginate(@ApiQueryParams() query: AqpDto): Promise<any> {
    return this.cartService.paginate(query);
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
    return this.cartService.findOneBy(filter, {
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
    const result = await this.cartService.findOneById(id, { populate });

    if (!result) throw new NotFoundException('The item does not exist');

    return result;
  }
}
