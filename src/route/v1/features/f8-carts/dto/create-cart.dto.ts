import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, IsNumber, Min, ValidateNested } from 'class-validator';
import { ItemDto } from './cart-item.dto';

export default class CreateCartDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => ItemDto)
  items: ItemDto
}
