import { PartialType } from '@nestjs/swagger';
import { CreatHotelGuestDto } from './create-hotel-guest.dto';

export class UpdateHotelGuestDto extends PartialType(CreatHotelGuestDto) {}
