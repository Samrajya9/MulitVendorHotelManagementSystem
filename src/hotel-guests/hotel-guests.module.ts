import { Module } from '@nestjs/common';
import { HotelGuestsService } from './hotel-guests.service';
import { HotelGuestsController } from './hotel-guests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelGuests } from './entities/hotel-guests.entity';
import { JwtHotelEmployeeGuard } from 'src/auth/guards/hotelEmployee/jwt-hotelEmployee.guard';
import { JwtHotelEmployeeStrategy } from 'src/auth/authentication/strategies/hotelEmployee/jwt-hotelEmployees.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([HotelGuests])],
  controllers: [HotelGuestsController],
  providers: [
    HotelGuestsService,
    JwtHotelEmployeeGuard,
    JwtHotelEmployeeStrategy,
  ],
})
export class HotelGuestsModule {}
