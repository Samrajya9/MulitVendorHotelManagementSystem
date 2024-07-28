import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from './entities/hotel.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/authentication/strategies/local.strategy';
import { AuthHotelModule } from 'src/auth_hotel/auth_hotel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotels]),
    JwtModule.register({
      secret: 'secert',
      signOptions: { expiresIn: '1m' },
    }),
    PassportModule,
  ],
  controllers: [HotelsController],
  providers: [HotelsService, LocalStrategy],
  exports: [HotelsService],
})
export class HotelsModule {}
