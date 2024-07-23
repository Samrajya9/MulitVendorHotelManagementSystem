import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels) private hotelsRepo: Repository<Hotels>,
  ) {}
  async create(createHotelDto: CreateHotelDto): Promise<Hotels> {
    const hotel = await this.getHotelByEmail(createHotelDto.email);
    if (hotel != null) {
      throw new NotFoundException(
        `User found with that email. Please use different email`,
        {
          cause: `user found with email in databse`,
          description: `user with email ${createHotelDto.email} alreday exist`,
        },
      );
    } else {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(createHotelDto.password, salt);
      const newHotel = new Hotels();
      newHotel.email = createHotelDto.email;
      newHotel.name = createHotelDto.name;
      newHotel.address = createHotelDto.address;
      newHotel.password = password;
      return this.hotelsRepo.save(newHotel);
    }
  }

  async getHotelByEmail(email: string): Promise<Hotels | undefined> {
    return this.hotelsRepo.findOne({ where: { email } });
  }

  async hotelogin(updateHotelDto: UpdateHotelDto) {
    const hotel = await this.getHotelByEmail(updateHotelDto.email);
    if (hotel == null) {
      throw new NotFoundException(`User not found with that email`, {
        cause: `no user found with email in databse`,
        description: `user with email ${updateHotelDto.email} not found`,
      });
    }
    const comparePassword = await bcrypt.compare(
      updateHotelDto.password,
      hotel.password,
    );
    if (!comparePassword) {
      throw new UnauthorizedException(`Unauthorized `, {
        cause: ``,
        description: `Paswword didnot match`,
      });
    } else {
      return hotel;
    }
  }
}
