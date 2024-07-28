import { Module } from '@nestjs/common';
import { AuthHotelService } from './auth-hotel.service';
import { AuthHotelController } from './auth-hotel.controller';
import { HotelsModule } from 'src/hotels/hotels.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './authentication/strategies/local.strategy';
import { JwtStrategy } from './authentication/strategies/jwt-auth.strategy';

@Module({
  imports: [
    HotelsModule,
    JwtModule.register({
      secret: 'secert',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [AuthHotelController],
  providers: [AuthHotelService, LocalStrategy, JwtStrategy],
  exports: [AuthHotelService],
})
export class AuthHotelModule {}
