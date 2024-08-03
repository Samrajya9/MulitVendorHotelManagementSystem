import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from './entities/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels) private hotelsRepo: Repository<Hotels>,
  ) {}

  async create(createHotelDto: CreateHotelDto): Promise<Hotels> {
    const newHotel = this.hotelsRepo.create(createHotelDto);
    return this.hotelsRepo.save(newHotel);
  }

  async getHotelByEmail(email: string): Promise<Hotels | null> {
    return await this.hotelsRepo.findOne({ where: { email } });
  }
}
