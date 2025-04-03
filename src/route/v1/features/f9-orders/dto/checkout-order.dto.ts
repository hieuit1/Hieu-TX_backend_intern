import { IsNumber } from 'class-validator';

export class CheckoutDto {
  @IsNumber()
  subTotal: number;

  @IsNumber()
  shippingCost: number;

  @IsNumber()
  discountAmount: number;

  @IsNumber()
  totalAmount: number;
}
