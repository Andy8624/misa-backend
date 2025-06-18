import { PartialType } from '@nestjs/swagger';
import { CreateAccountMainSystemDto } from './create-account_main_system.dto';

export class UpdateAccountMainSystemDto extends PartialType(CreateAccountMainSystemDto) {}
