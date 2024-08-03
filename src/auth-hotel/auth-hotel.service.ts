import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HotelsService } from 'src/hotels/hotels.service';
import { AuthLoginHotelDto } from './dto/auth-login-hotel.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateHotelDto } from 'src/hotels/dto/create-hotel.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthHotelService {
  constructor(
    private hotelService: HotelsService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async signup(createHotelDto: CreateHotelDto) {
    const oldhotel = await this.hotelService.getHotelByEmail(
      createHotelDto.email,
    );
    if (oldhotel != null) {
      throw new ConflictException(
        `User found with email ${createHotelDto.email}. Please use a different email.`,
      );
    }
    const hashedPassword = await this.hashPassword(createHotelDto.password);
    createHotelDto.password = hashedPassword;
    const newHotel = await this.hotelService.create(createHotelDto);
    const result = plainToInstance(Hotels, newHotel);
    return result;
  }

  async validateHotel(authLoginHotelDto: AuthLoginHotelDto) {
    const hotel = await this.hotelService.getHotelByEmail(
      authLoginHotelDto.email,
    );
    if (hotel == null) {
      throw new NotFoundException(`User not found with that email`, {
        cause: `No user found with email in database`,
        description: `User with email ${authLoginHotelDto.email} not found`,
      });
    }
    const comparePassword = await bcrypt.compare(
      authLoginHotelDto.password,
      hotel.password,
    );
    if (!comparePassword) {
      throw new UnauthorizedException(`Unauthorized`, {
        cause: ``,
        description: `Password did not match`,
      });
    }
    return plainToInstance(Hotels, hotel);
  }

  private async createJwtToken<T extends object>(
    payload: T,
    options?: { expiresIn?: string | number },
  ): Promise<string> {
    return options
      ? this.jwtService.sign(payload, options)
      : this.jwtService.sign(payload);
  }

  async login(res: Response, payload: {}) {
    const accessToken = await this.createJwtToken(payload);
    const refreshToken = await this.createJwtToken(payload, {
      expiresIn: '7d',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Use 'true' if you're using HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
    return { success: true, data: { accessToken } };
  }
async isloggedIn(req: Request){
  return req.cookies;
}
  async signout(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    return { success: true, data: 'sign out' };
  }
}
