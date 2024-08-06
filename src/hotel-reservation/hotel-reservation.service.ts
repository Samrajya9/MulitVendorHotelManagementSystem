import { Injectable } from '@nestjs/common';
import { CreateHotelReservationDto } from './dto/create-hotel-reservation.dto';
import { UpdateHotelReservationDto } from './dto/update-hotel-reservation.dto';

@Injectable()
export class HotelReservationService {
  create(createHotelReservationDto: CreateHotelReservationDto) {
    return 'This action adds a new hotelReservation';
  }

  findAll() {
    return `This action returns all hotelReservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelReservation`;
  }

  update(id: number, updateHotelReservationDto: UpdateHotelReservationDto) {
    return `This action updates a #${id} hotelReservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelReservation`;
  }
}
