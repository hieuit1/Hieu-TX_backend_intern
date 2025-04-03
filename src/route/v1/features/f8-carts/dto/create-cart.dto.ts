import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ItemDto } from './cart-item.dto';

export default class CreateCartDto {
  @IsNotEmpty()
  @IsMongoId()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
