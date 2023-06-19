import { PartialType } from '@nestjs/mapped-types';
import { CreateUserdetailDto } from './create-userdetail.dto';

export class UpdateUserdetailDto extends PartialType(CreateUserdetailDto) {}
