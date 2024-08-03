import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HotelsModule } from 'src/hotels/hotels.module';
import { HotelEmployeesModule } from 'src/hotel-employees/hotel-employees.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[HotelsModule,HotelEmployeesModule,
    JwtModule.register({
      secret:'secert',
      signOptions:{expiresIn:'1h'},
    }),PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
