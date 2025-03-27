import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable, NotFoundException } from '@nestjs/common';
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

    // console.log(cart);
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
          existingItem.quantity += newItem.quantity;
        } else {
          cart.items.push(newItem);
        }
      });

      // updata cart
      await this.cartRepository.updateOneById(cart._id, { items: cart.items });
    }
    return cart;
  }

  async getProductInCart(userId: string, skuId: string) {
    const cart = this.cartRepository.findOneBy({ userId });
    if (!cart) {
      throw new NotFoundException('this cart is exits');
    }

    const exitingItem = this.cartRepository.findOneBy({ skuId });
    if (!exitingItem) {
      throw new NotFoundException('this product is exiting in cart');
    }

    return cart;
  }

  async removeFromCart(userId: string, skuId: string) {
    const cart = await this.cartRepository.findOneBy({ userId });

    if (!cart) {
      throw new NotFoundException('this cart does not exist');
    }

    const itemExists = cart.items.filter(
      (item: CartItem) => item.skuId === skuId,
    );

    if (!itemExists) {
      throw new NotFoundException(`item with skuId ${skuId} not found in cart`);
    }

    cart.items = cart.items.filter((item: CartItem) => item.skuId !== skuId);

    await this.cartRepository.updateOneById(cart._id, { items: cart.items });

    return { message: 'product has been reromve from the cart', cart };
  }
}
