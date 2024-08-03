import { Module } from '@nestjs/common';
import { AuthHotelEmployeesService } from './auth-hotel-employees.service';
import { AuthHotelEmployeesController } from './auth-hotel-employees.controller';
import { HotelEmployeesModule } from 'src/hotel-employees/hotel-employees.module';
import { AppJwtService } from 'src/utilities/jwt/jwtService';

@Module({
  imports: [HotelEmployeesModule],
  controllers: [AuthHotelEmployeesController],
  providers: [
    AuthHotelEmployeesService, 
    AppJwtService
  ],
})
export class AuthHotelEmployeesModule { }
