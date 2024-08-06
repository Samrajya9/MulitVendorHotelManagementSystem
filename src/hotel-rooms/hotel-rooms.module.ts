import { Module } from '@nestjs/common';
import { HotelRoomsService } from './hotel-rooms.service';
import { HotelRoomsController } from './hotel-rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRooms } from './entities/hotel-room.entity';
import { JwtHotelEmployeeStrategy } from 'src/auth/authentication/strategies/hotelEmployee/jwt-hotelEmployees.strategy';
import { JwtHotelEmployeeGuard } from 'src/auth/guards/hotelEmployee/jwt-hotelEmployee.guard';
import { IsValidHotelEmployeeReq } from 'src/auth/guards/hotelEmployee/isValidHotel-EmployessReq.guard';

@Module({
  imports: [TypeOrmModule.forFeature([HotelRooms])],
  controllers: [HotelRoomsController],
  providers: [
    HotelRoomsService,
    JwtHotelEmployeeStrategy,
    JwtHotelEmployeeGuard,
    IsValidHotelEmployeeReq,
  ],
})
export class HotelRoomsModule {}
