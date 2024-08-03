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

@Module({
  imports:[HotelsModule,HotelEmployeesModule,
    JwtModule.register({
      secret:'secert',
      signOptions:{expiresIn:'1h'},
    }),PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalHotelStrategy,JwtHotelStrategy,isloggedInHotelGuard,LocaHotelEmployeeStrategy],
  exports:[AuthService]
})
export class AuthModule {}
