import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelGuests } from './entities/hotel-guests.entity';
import { Repository } from 'typeorm';
import { CreatHotelGuestDto } from './dto/create-hotel-guest.dto';
import { UpdateHotelGuestDto } from './dto/update-hotel-guest.dto';

@Injectable()
export class HotelGuestsService {
  constructor(
    @InjectRepository(HotelGuests)
    private hotelGuestsRepo: Repository<HotelGuests>,
  ) {}

  async createGuest(createGuestDto: CreatHotelGuestDto): Promise<HotelGuests> {
    const guest = await this.hotelGuestsRepo.create(createGuestDto);
    return await this.hotelGuestsRepo.save(guest);
  }

  async findAllGuets(hotel_id: number): Promise<HotelGuests[] | null> {
    const guests = await this.hotelGuestsRepo.find({ where: { hotel_id } });
    return guests;
  }

  async findGuest(hotel_id: number, guest_id: number) {
    const guest = await this.hotelGuestsRepo.findOne({
      where: { hotel_id, id: guest_id },
    });
    return guest;
  }

  async updateGuest(
    hotel_id: number,
    guest_id: number,
    updateHotelGuestDto: UpdateHotelGuestDto,
  ) {
    const guest = await this.findGuest(hotel_id, guest_id);
    const UpdatedHotelGuest = Object.assign(guest, updateHotelGuestDto);
    const result = await this.hotelGuestsRepo.save(UpdatedHotelGuest);
    return result;
  }

  async deleteGuest(hotel_id: number, guest_id: number) {
    const result = await this.hotelGuestsRepo.delete({
      hotel_id,
      id: guest_id,
    });
    return result;
  }
}
