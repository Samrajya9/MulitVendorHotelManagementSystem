import { Module } from '@nestjs/common';
import { HotelReservationService } from './hotel-reservation.service';
import { HotelReservationController } from './hotel-reservation.controller';

@Module({
  controllers: [HotelReservationController],
  providers: [HotelReservationService],
})
export class HotelReservationModule {}
