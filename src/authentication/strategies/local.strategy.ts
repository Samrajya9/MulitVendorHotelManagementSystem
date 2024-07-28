import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { Strategy } from 'passport-local';
import { LoginHotelDto } from 'src/hotels/dto/login-hotel.dto';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { HotelsService } from 'src/hotels/hotels.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private hotelService: HotelsService) {
    // Specify that the username field is 'email'
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log(`strategy`);
    const loginHotelDto: LoginHotelDto = { email, password };
    const hotel = await this.hotelService.validateHotel(loginHotelDto);
    if (!hotel) {
      throw new UnauthorizedException();
    }
    const result = plainToInstance(Hotels, hotel);
    return result;
  }
}
