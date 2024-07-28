import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HotelsService } from 'src/hotels/hotels.service';
import { LoginAuthHotel } from './dto/login-auth_hotel.dto';
import { plainToInstance } from 'class-transformer';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { UpdateHotelDto } from 'src/hotels/dto/update-hotel.dto';

@Injectable()
export class AuthHotelService {
  constructor(
    private jwtService: JwtService,
    private hotelService: HotelsService,
  ) {}

  async createJWT(payload: {}): Promise<string> {
    return await this.jwtService.sign(payload);
  }
}
