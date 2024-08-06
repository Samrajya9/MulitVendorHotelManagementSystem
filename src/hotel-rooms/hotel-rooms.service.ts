import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelRooms } from './entities/hotel-room.entity';
import { DeleteResult, Repository } from 'typeorm';

interface FetchHotelRoomOptions {
  hotel_id: number;
  id?: number;
  name?: string;
}

@Injectable()
export class HotelRoomsService {
  constructor(
    @InjectRepository(HotelRooms) private hotelRoomRepo: Repository<HotelRooms>,
  ) {}

  async createRoom(createHotelRoomDto: CreateHotelRoomDto) {
    const hotelRoom = await this.hotelRoomRepo.find({
      where: {
        hotel_id: createHotelRoomDto.hotel_id,
        name: createHotelRoomDto.name,
      },
    });
    if (hotelRoom.length > 0) {
      throw new ConflictException(
        `Hotel with name ${createHotelRoomDto.name} already exist`,
      );
    }
    const newHotelRoom = this.hotelRoomRepo.create(createHotelRoomDto);
    return this.hotelRoomRepo.save(newHotelRoom);
  }

  async findAllRooms(hotel_id: number): Promise<HotelRooms[]> {
    return await this.hotelRoomRepo.find({ where: { hotel_id: hotel_id } });
  }

  async findOneRoom(
    hotel_id: number,
    room_id: number,
  ): Promise<HotelRooms | null> {
    const hotelRoom = await this.validateHotelRoomById(hotel_id, room_id);
    return hotelRoom;
  }

  async updateRoom(
    hotel_id: number,
    id: number,
    updateHotelRoomDto: UpdateHotelRoomDto,
  ) {
    const hotelRoom = await this.validateHotelRoomById(hotel_id, id);
    if (updateHotelRoomDto.hotel_id) {
      if (hotelRoom.hotel_id != updateHotelRoomDto.hotel_id) {
        throw new ForbiddenException('Unable to Update hotel room');
      }
    }
    const updatedHotelRoom = Object.assign(hotelRoom, updateHotelRoomDto);
    return await this.hotelRoomRepo.save(updatedHotelRoom);
  }

  async deleteRoom(hotel_id: number, id: number): Promise<DeleteResult | null> {
    const hotelRoom = await this.validateHotelRoomById(hotel_id, id);
    return await this.hotelRoomRepo.delete({ hotel_id, id });
  }

  async fetchHotelRoom(
    options: FetchHotelRoomOptions,
  ): Promise<HotelRooms | null> {
    if (!options.hotel_id) {
      throw new Error('Hotel ID is required');
    }
    return await this.hotelRoomRepo.findOne({
      where: options,
    });
  }

  private async validateHotelRoomById(
    hotel_id: number,
    room_id: number,
  ): Promise<HotelRooms | null> {
    const hotelRoom = await this.fetchHotelRoom({ hotel_id, id: room_id });
    if (!hotelRoom) {
      throw new NotFoundException(
        `Room with id ${room_id} in hotel ${hotel_id} not found`,
      );
    }
    return hotelRoom;
  }

  // private async validateHotelRoomByName(
  //   hotel_id: number,
  //   name: string,
  // ): Promise<HotelRooms | null> {
  //   const hotelRoom = await this.fetchHotelRoom({ hotel_id, name: name });
  //   if (!hotelRoom) {
  //     throw new NotFoundException(
  //       `Room with id ${name} in hotel ${hotel_id} not found`,
  //     );
  //   }
  //   return hotelRoom;
  // }
}
