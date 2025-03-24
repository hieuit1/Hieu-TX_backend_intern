import {  IsMongoId, IsNotEmpty,  IsString } from 'class-validator';

export default class CreateCategoryDto {
  @IsMongoId()
  @IsNotEmpty()
  parentId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

}
