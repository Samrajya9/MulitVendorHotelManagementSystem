import { PartialType } from '@nestjs/swagger';
import { CreateHotelTransactionDto } from './create-hotel-transaction.dto';

export class UpdateHotelTransactionDto extends PartialType(CreateHotelTransactionDto) {}
