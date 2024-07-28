import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthHotelService } from 'src/auth-hotel/auth-hotel.service';
import { AuthLoginHotelDto } from 'src/auth-hotel/dto/auth-login-hotel.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authHotelService: AuthHotelService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }
  async validate(email: string, password: string) {
    console.log(`local strategy`);

    const authLoginHotelDto: AuthLoginHotelDto = { email, password };

    const hotel = await this.authHotelService.validateHotel(authLoginHotelDto);
    if (!hotel) {
      throw new UnauthorizedException();
    }

    return hotel;
  }
}
