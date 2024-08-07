import { Injectable } from '@nestjs/common';
import { CreateHotelReservationDto } from './dto/create-hotel-reservation.dto';
import { UpdateHotelReservationDto } from './dto/update-hotel-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelReservation } from './entities/hotel-reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelReservationService {
  constructor(
    @InjectRepository(HotelReservation)
    private hotelReservationRepo: Repository<HotelReservation>,
  ) {}
  async createReservation(
    createHotelReservationDto: CreateHotelReservationDto,
  ) {
    const reservation = await this.hotelReservationRepo.create(
      createHotelReservationDto,
    );
    const result = await this.hotelReservationRepo.save(reservation);
    return result;
  }

  async findAllReservation(hotel_id: number) {
    const result = await this.hotelReservationRepo.find({
      where: {
        hotel_id,
      },
    });
    return result;
  }

  async findOneReservation(hotel_id: number, reservation_id: number) {
    const result = await this.hotelReservationRepo.findOne({
      where: { hotel_id, id: reservation_id },
    });
    return result;
  }

  async updateReservation(
    hotel_id: number,
    reservation_id: number,
    updateHotelReservationDto: UpdateHotelReservationDto,
  ) {
    console.log(updateHotelReservationDto);
    const reservation = await this.hotelReservationRepo.findOne({
      where: { hotel_id, id: reservation_id },
    });
    console.log(reservation);

    const UpdatedHotelReservation = Object.assign(
      reservation,
      updateHotelReservationDto,
    );
    const result = await this.hotelReservationRepo.save(
      UpdatedHotelReservation,
    );
    return result;
  }

  async deleteReservation(hotel_id: number, reservation_id: number) {
    const result = await this.hotelReservationRepo.delete({
      hotel_id,
      id: reservation_id,
    });
    return result;
  }
}
