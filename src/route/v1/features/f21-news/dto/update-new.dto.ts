import { PartialType } from '@nestjs/mapped-types';
import CreateNewDto from './create-new.dto';

export default class UpdateNewDto extends PartialType(CreateNewDto) {}
