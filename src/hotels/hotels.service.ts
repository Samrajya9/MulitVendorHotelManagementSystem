import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotels } from './entities/hotel.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { LoginHotelDto } from './dto/login-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels) private hotelsRepo: Repository<Hotels>,
    private jwtService: JwtService,
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
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(createHotelDto.password, salt);
      const newHotel = plainToInstance(Hotels, createHotelDto);
      newHotel.password = password;
      return this.hotelsRepo.save(newHotel);
    }
  }

  private async getHotelByEmail(email: string): Promise<Hotels | undefined> {
    return this.hotelsRepo.findOne({ where: { email } });
  }

  private async createJWT(payload: {}): Promise<string> {
    return await this.jwtService.sign(payload);
  }

  async validateHotel(loginHotelDto: LoginHotelDto): Promise<Hotels> {
    const hotel = await this.getHotelByEmail(loginHotelDto.email);
    if (hotel == null) {
      throw new NotFoundException(`User not found with that email`, {
        cause: `No user found with email in database`,
        description: `User with email ${loginHotelDto.email} not found`,
      });
    }
    const comparePassword = await bcrypt.compare(
      loginHotelDto.password,
      hotel.password,
    );
    if (!comparePassword) {
      throw new UnauthorizedException(`Unauthorized`, {
        cause: ``,
        description: `Password did not match`,
      });
    }
    return hotel;
  }
}
