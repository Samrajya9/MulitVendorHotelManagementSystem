// Correct the import paths according to your structure
import { Module } from '@nestjs/common';
import { AuthHotelService } from './auth_hotel.service';
import { AuthHotelController } from './auth_hotel.controller';
import { HotelsModule } from 'src/hotels/hotels.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../authentication/strategies/jwt.strategy';

@Module({
  imports: [
    HotelsModule,
    JwtModule.register({
      secret: 'secret', // Corrected typo 'secert' to 'secret'
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [AuthHotelController],
  providers: [AuthHotelService, JwtStrategy],
})
export class AuthHotelModule {}
