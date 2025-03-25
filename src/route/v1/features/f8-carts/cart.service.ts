import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import ProductService from '../f3-products/product.service';
import CartRepository from './cart.repository';
import CreateCartDto from './dto/create-cart.dto';
import { CartItem } from './schemas/cart-item.schema';
import { CartDocument } from './schemas/cart.schema';

@Injectable()
export default class CartService extends BaseService<CartDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly cartRepository: CartRepository,
    readonly productService: ProductService,
  ) {
    super(logger, cartRepository);
  }

  async totalCart(userId: string, filter: any) {
    const cart = await this.cartRepository.findOneBy(
      { userId },
      {
        populate: {
          path: 'items',
          populate: { path: 'skuId' },
        },
      },
    );
    if (!cart) throw new NotFoundException('');

    console.log(cart);
    let total = 0;
    cart.items.forEach((item: any) => {
      console.log(item);
      total += item.skuId.price * item.quantity;
    });

    return total;
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
          (item: CartItem) => item.skuId.toString() === newItem.skuId,
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

  async removeFromCart(userId: string, skuId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('userId không hợp lệ');
    }

    if (!Types.ObjectId.isValid(skuId)) {
      throw new BadRequestException('skuId không hợp lệ');
    }

    const objectUserId = new Types.ObjectId(userId);
    const objectSkuId = new Types.ObjectId(skuId);

    const cart = await this.cartRepository.findOneBy({ userId: objectUserId });

    if (!cart) {
      throw new NotFoundException('Giỏ hàng không tồn tại');
    }

    const updatedItems = cart.items.filter(
      (item: CartItem) => item.skuId !== objectSkuId.toHexString(),
    );

    if (updatedItems.length === cart.items.length) {
      throw new NotFoundException('Sản phẩm không tồn tại trong giỏ hàng');
    }

    cart.items = updatedItems;
    await this.cartRepository.updateOneById(cart._id, { items: updatedItems });

    return { message: 'Sản phẩm đã được xóa khỏi giỏ hàng', cart };
  }
}
