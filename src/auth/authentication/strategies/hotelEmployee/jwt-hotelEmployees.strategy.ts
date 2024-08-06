import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtHotelEmployeeStrategy extends PassportStrategy(
  Strategy,
  'JwtHotelEmployeeStrategy',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secert',
    });
  }
  async validate(payload: any) {
    console.log(`Jwt HotelEmployee startegy activated`);
    return payload;
  }
}
