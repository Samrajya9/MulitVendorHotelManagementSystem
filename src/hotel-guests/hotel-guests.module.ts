import { Module } from '@nestjs/common';
import { HotelGuestsService } from './hotel-guests.service';
import { HotelGuestsController } from './hotel-guests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelGuests } from './entities/hotel-guests.entity';

@Module({imports:[TypeOrmModule.forFeature([HotelGuests])],
  controllers: [HotelGuestsController],
  providers: [HotelGuestsService],
})
export class HotelGuestsModule {}
