import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import FlashSaleRepository from '../f18-flash-sales/flash-sale.repository';
import ProductService from '../f3-products/product.service';
import DiscountRepository from '../f5-discounts/discount.repository';
import { ApplyTo } from '../f5-discounts/enums/apply-to.enum';
import { DiscountDocument } from '../f5-discounts/schemas/discount.schema';
import CartRepository from './cart.repository';
import AddItemDto from './dto/add-item.dto';
import EditItemDto from './dto/edit-item.dto';
import { CartDocument } from './schemas/cart.schema';

@Injectable()
export default class CartService extends BaseService<CartDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly cartRepository: CartRepository,
    readonly productService: ProductService,
    readonly skuRepository: ProductService,
    readonly discountRepository: DiscountRepository,
    readonly flashSaleRepository: FlashSaleRepository,
  ) {
    super(logger, cartRepository);
  }

  async getMyCart(customerId: string) {
    const cart: CartDocument = await this.cartRepository.findOneBy(
      { customerId },
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
    const nowInSeconds = Math.floor(Date.now() / 1000);

    // filter flash sale
    // const flashSale: FlashSaleDocument[] =
    //   await this.flashSaleRepository.findManyBy({
    //     validFrom: { $lte: nowInSeconds },
    //     validTo: { $gte: nowInSeconds },
    //     isActive: true,
    //   });

    //map key and value
    // const skuFlashSaleMap = new Map<string, FlashSaleProduct>();
    // const productFlashSaleMap = new Map<string, FlashSaleProduct>();

    // flashSale.forEach(sale => sale.products.forEach((product) => {
    //   if(){

    //   }
    // }))

    // const mapFlaseSalse = flashSale.forEach(flashSale => )

    // filter discount has uses
    const discounts: DiscountDocument[] =
      await this.discountRepository.findManyBy({
        validFrom: { $lte: nowInSeconds },
        validTo: { $gte: nowInSeconds },
        maxUses: { $gt: 0 },
        userUsed: { $nin: [customerId] },
        isActive: true,
      });

    // apply to
    // const validDiscount = discounts.filter((discount) => {
    //   return (
    //     discount.applyTo === ApplyTo.all ||
    //     (discount.applyTo === ApplyTo.specific &&
    //       discount.productIds.some((productId) =>
    //         cart.items.some(
    //           (item) => item.productId.toString() === productId.toString(),
    //         ),
    //       )) ||
    //     discount.skuIds.some((skuId) =>
    //       cart.items.some((item) => item.skuId.toString() === skuId.toString()),
    //     )
    //   );
    // });

    const validDiscount = discounts.filter((discount) => {
      if (discount.applyTo === ApplyTo.all) return true;

      if (discount.applyTo === ApplyTo.specific) {
        const hasMatchingProduct = discount.productIds.some((productId) =>
          cart.items.some((item) => {
            const itemProductId =
              (item.productId as any)?._id?.toString?.() ??
              (item.productId as any)?.toString?.();
            return itemProductId === productId.toString();
          }),
        );

        const hasMatchingSku = discount.skuIds.some((skuId) =>
          cart.items.some((item) => {
            const itemSkuId =
              (item.skuId as any)?._id?.toString?.() ??
              (item.skuId as any)?.toString?.();
            return itemSkuId === skuId.toString();
          }),
        );

        return hasMatchingProduct || hasMatchingSku;
      }

      return false;
    });

    //map key : producntId and skuId and value : discount
    const productDiscountMap = new Map<string, any>();
    const skuDiscountMap = new Map<string, any>();

    validDiscount.forEach((discount) => {
      discount.productIds.forEach((productId) => {
        productDiscountMap.set(productId.toString(), discount);
      });

      discount.skuIds.forEach((skuId) =>
        skuDiscountMap.set(skuId.toString(), discount),
      );
    });

    cart.items.forEach((item: any) => {
      // find discount give productId and skuId

      const productIdStr =
        item.productId?._id?.toString?.() ?? item.productId?.toString?.();
      const skuIdStr =
        item.skuId?._id?.toString?.() ?? item.skuId?.toString?.();

      const productDiscount = productDiscountMap.get(productIdStr);
      const skuIdDiscount = skuDiscountMap.get(skuIdStr);

      let discountToApply = null;

      if (productDiscount) {
        discountToApply = productDiscount;
      } else if (skuIdDiscount) {
        discountToApply = skuIdDiscount;
      }

      if (discountToApply) {
        const originalPrice =
          item.skuId?.basePrice ?? item.productId?.basePrice ?? 0;
        let discountedPrice = originalPrice - discountToApply.discountValue;

        if (discountToApply.maxDiscountValue > 0) {
          const maxDiscount = originalPrice - discountToApply.maxDiscountValue;
          discountedPrice = Math.max(discountedPrice, maxDiscount);
        }

        Object.assign(item, {
          discountedPrice,
          discountDetails: discountToApply,
        });
      }
    });

    if (!cart) return this.cartRepository.create({ customerId, items: [] });

    return cart;
  }

  async addItemToCart(customerId: string, input: AddItemDto) {
    const cart: CartDocument = await this.cartRepository.findOneBy({
      customerId,
    });

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
      throw new NotFoundException('this cart is not exits');
    }

    const exitingItem = this.cartRepository.findOneBy({ skuId });
    if (!exitingItem) {
      throw new NotFoundException('this product is exiting in cart');
    }

    return cart;
  }

  async removeFromCart(itemId: string) {
    const cart = await this.cartRepository.findOneBy({ 'items._id': itemId });

    if (!cart) {
      throw new NotFoundException('this item does not exist');
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

    return cart;
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

    // Xóa item khỏi giỏ hàng
    cart.items.splice(itemIndex, 1);

    await this.cartRepository.updateOneById(cart._id, { items: cart.items });

    return { message: 'Item has been removed from the cart', cart };
  }

  async deleteAllItem(cartId: string /*newItems: AddItemDto[]*/) {
    const cart = await this.cartRepository.findOneBy({
      _id: cartId,
    });
    if (!cart) {
      throw new NotFoundException('Cart does not exist for this user');
    }

    // cart.items = newItems;
    // cart.items = [];
    await this.cartRepository.updateOneById(cart._id, { items: [] });

    return cart;
  }

  async editItemInCart(itemId: string, input: EditItemDto) {
    const cart: CartDocument = await this.cartRepository.findOneBy({
      'items._id': itemId,
    });

    const itemIndex = cart.items.findIndex(
      (item: any) => item._id.toString() === itemId,
    );

    if (itemIndex === -1) throw new NotFoundException(`Item not found in cart`);

    cart.items[itemIndex] = { ...cart.items[itemIndex], ...input };

    // @ts-ignore'
    await this.cartRepository.updateOneById(cart._id, { items: cart.items });

    return cart;
  }
}
