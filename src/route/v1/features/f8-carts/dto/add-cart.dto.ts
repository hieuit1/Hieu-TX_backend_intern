import { IsMongoId, IsNotEmpty, IsNumber, Min } from "class-validator";

export default class AddToCartDto {
    @IsNotEmpty()
    @IsMongoId()
    userId: string;
  
    @IsNotEmpty()
    @IsMongoId()
    productId: string;
  
    @IsNotEmpty()
    @IsMongoId()
    skuId: string;
  
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
  }