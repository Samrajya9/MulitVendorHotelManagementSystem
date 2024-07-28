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
    const hotel = await this.getHotelByEmail(createHotelDto.email);
    if (hotel != null) {
      throw new NotFoundException(
        `User found with that email. Please use a different email`,
        {
          cause: `User found with email in database`,
          description: `User with email ${createHotelDto.email} already exists`,
        },
      );
    } else {
      const newHotel = this.hotelsRepo.create(createHotelDto);
      return this.hotelsRepo.save(newHotel);
    }
  }

  async getHotelByEmail(email: string): Promise<Hotels | undefined> {
    return await this.hotelsRepo.findOne({ where: { email } });
  }
}
