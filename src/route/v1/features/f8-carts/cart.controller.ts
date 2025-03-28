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
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { Types } from 'mongoose';
import CartService from './cart.service';
import AddItemDto from './dto/add-item.dto';
import UpdateCartDto from './dto/update-cart.dto';

@ApiTags('Carts')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * get my cart
   *
   * @param body
   * @returns
   */
  @Get('users/:userId')
  @HttpCode(200)
  async getMyCart(@Param('userId', ParseObjectIdPipe) userId: string) {
    // @GetCurrentUserId() userId: string
    return this.cartService.getMyCart(userId);
  }

  /**
   * Add to cart
   *
   * @param body
   * @returns
   */
  @Post('/:cartId/item')
  @HttpCode(200)
  async addItemToCart(
    @Param('cartId', ParseObjectIdPipe) cartId: string,
    @Body() body: AddItemDto,
  ) {
    return this.cartService.addItemToCart(cartId, body);
  }

  /**
   * remove from cart
   *
   * @param body
   * @returns
   */
  @Put('/:cartId/items/:itemId/remove')
  @HttpCode(200)
  async removeItemFromCart(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
  ) {
    const result = this.cartService.removeFromCart(cartId, itemId);
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

  @Get('getProductFromCart/:userId/:skuId')
  @HttpCode(200)
  async getProductIncart(
    @Param('userId') userId: string,
    @Param('skuId') skuId: string,
  ) {
    return this.cartService.getProductInCart(userId, skuId);
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
