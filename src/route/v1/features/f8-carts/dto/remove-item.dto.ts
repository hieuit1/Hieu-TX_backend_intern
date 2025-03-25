import { IsMongoId, IsNotEmpty } from 'class-validator';

export class RemoveItemDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  skuId: string;
}
