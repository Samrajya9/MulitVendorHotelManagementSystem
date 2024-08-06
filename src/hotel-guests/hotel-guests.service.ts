import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelGuests } from './entities/hotel-guests.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelGuestsService {
    constructor(@InjectRepository(HotelGuests)
    private hotelGuestsRepo:Repository<HotelGuests>    
){}
}
