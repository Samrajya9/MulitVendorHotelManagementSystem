import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HotelsModule } from 'src/hotels/hotels.module';
import { HotelEmployeesModule } from 'src/hotel-employees/hotel-employees.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalHotelStrategy } from './authentication/strategies/hotel/local-hotel.strategy';
import { JwtHotelStrategy } from './authentication/strategies/hotel/jwt-hotel.strategy';
import { isloggedInHotelGuard } from './guards/hotel/isLoggedIn-hotel.guard';
import { LocaHotelEmployeeStrategy } from './authentication/strategies/hotelEmployee/local-hotelEmployee.strategy';
import { JwtHotelEmployeeStrategy } from './authentication/strategies/hotelEmployee/jwt-hotelEmployees.strategy';
import { JwtHotelEmployeeGuard } from './guards/hotelEmployee/jwt-hotelEmployee.guard';
import { IsValidHotelEmployeeReq } from './guards/hotelEmployee/isValidHotel-EmployessReq.guard';

@Module({
  imports: [
    HotelsModule,
    HotelEmployeesModule,
    JwtModule.register({
      secret: 'secert',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalHotelStrategy,
    JwtHotelStrategy,
    isloggedInHotelGuard,
    LocaHotelEmployeeStrategy,
    JwtHotelEmployeeStrategy,
    JwtHotelEmployeeGuard,
    IsValidHotelEmployeeReq,
  ],
  exports: [
    AuthService,
    JwtHotelEmployeeStrategy,
    JwtHotelEmployeeGuard,
    IsValidHotelEmployeeReq,
  ],
})
export class AuthModule {}
