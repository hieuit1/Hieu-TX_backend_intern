import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CartDocument } from './schemas/cart.schema';
import CartRepository from './cart.repository';
import CreateCartDto from './dto/create-cart.dto';
import { CartItem } from './schemas/cart-item.schema';

@Injectable()
export default class CartService extends BaseService<CartDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly cartRepository: CartRepository,
  ) {
    super(logger, cartRepository);
  }
   /**
 * Add products to cart (supporting SKU)
 * @param userId
 * @param items
 * @returns Updated Cart
 */
async addToCart(userId: string, items: CreateCartDto['items']) {
  let cart = await this.cartRepository.findOneBy({ userId });

  if (!cart) {
    cart = await this.cartRepository.create({ userId, items });
  } else {
    items.forEach((newItem) => {
      const existingItem = cart.items.find(
        (item: CartItem) => item.skuId.toString() === newItem.skuId
      );

      if (existingItem) {
        throw new BadRequestException(`Sản phẩm đã được thêm vào`);
      } else {
        cart.items.push(newItem);
      }
    });
    
    // updata cart
    await this.cartRepository.updateOneById(cart._id, { items: cart.items });
  }

  return cart;
}
}
