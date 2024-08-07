import { Module } from '@nestjs/common';
import { HotelReservationService } from './hotel-reservation.service';
import { HotelReservationController } from './hotel-reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelReservation } from './entities/hotel-reservation.entity';
import { JwtHotelEmployeeStrategy } from 'src/auth/authentication/strategies/hotelEmployee/jwt-hotelEmployees.strategy';
import { JwtHotelEmployeeGuard } from 'src/auth/guards/hotelEmployee/jwt-hotelEmployee.guard';

@Module({
  imports: [TypeOrmModule.forFeature([HotelReservation])],
  controllers: [HotelReservationController],
  providers: [
    HotelReservationService,
    JwtHotelEmployeeStrategy,
    JwtHotelEmployeeGuard,
  ],
})
export class HotelReservationModule {}
