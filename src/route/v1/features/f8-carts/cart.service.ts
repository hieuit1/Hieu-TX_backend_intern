import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import ProductService from '../f3-products/product.service';
import CartRepository from './cart.repository';
import AddItemDto from './dto/add-item.dto';
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

  async getMyCart(userId: string) {
    const cart = await this.cartRepository.findOneBy(
      { userId },
      {
        populate: [
          {
            path: 'items.productId',
          },
          {
            path: 'items.skuId',
          },
        ],
      },
    );

    if (!cart) return this.cartRepository.create({ userId, items: [] });

    return cart;
  }

  async addItemToCart(cartId: string, input: AddItemDto) {
    const cart: CartDocument = await this.cartRepository.findOneById(cartId);

    const itemIndex = cart.items.findIndex(
      (item) => item.productId == input.productId && item.skuId === input.skuId,
    );

    if (itemIndex === -1) {
      cart.items.push(input);
    } else {
      cart.items[itemIndex].quantity += input.quantity;
    }

    // @ts-ignore
    return this.cartRepository.updateOneById(cart._id, {
      items: cart.items,
    });
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

  async removeFromCart(cartId: string, itemId: string) {
    const cart = await this.cartRepository.findOneBy({ _id: cartId });

    if (!cart) {
      throw new NotFoundException('this cart does not exist');
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item._id.toString() === itemId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException(`itemId ${itemId} not found in cart`);
    }

    // cart.items = cart.items.filter((item: any) => item._id !== itemId);
    cart.items.splice(itemIndex, 1);

    await this.cartRepository.updateOneById(cart._id, { items: cart.items });

    return { message: 'item has been reromve from the cart', cart };
  }

  async removeCheckoutFromCart(userId: string, itemId: string) {
    const cart = await this.cartRepository.findOneBy({ userId });

    if (!cart) {
      throw new NotFoundException('Cart does not exist for this user');
    }

    const itemIndex = cart.items.findIndex(
      (item: any) =>
        item.productId.toString() === itemId ||
        item.skuId.toString() === itemId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException(`Item ${itemId} not found in cart`);
    }

    // Xóa item khỏi giỏ hàng
    cart.items.splice(itemIndex, 1);

    await this.cartRepository.updateOneById(cart._id, { items: cart.items });

    return { message: 'Item has been removed from the cart', cart };
  }
}
