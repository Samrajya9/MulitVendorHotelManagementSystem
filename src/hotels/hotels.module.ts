import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from './entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotels])],
  controllers: [HotelsController],
  providers: [HotelsService,],
  exports: [HotelsService],
})
export class HotelsModule {}
