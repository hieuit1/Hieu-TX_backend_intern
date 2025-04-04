import { PartialType } from '@nestjs/mapped-types';
import CreateBrancheDto from './create-branche.dto';

export default class UpdateBrancheDto extends PartialType(CreateBrancheDto) {}
