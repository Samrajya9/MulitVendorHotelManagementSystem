import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from './entities/hotel.entity';
import { JwtStrategy } from 'src/auth-hotel/authentication/strategies/jwt-auth.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Hotels])],
  controllers: [HotelsController],
  providers: [HotelsService, JwtStrategy],
  exports: [HotelsService],
})
export class HotelsModule {}
