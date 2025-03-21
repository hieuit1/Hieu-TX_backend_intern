import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ItemDto {
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
