import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secert', // Ensure the secret key is correct
    });
  }

  async validate(payload: any) {
    console.log(`JWT Guard Payload: ${JSON.stringify(payload)}`);
    if (!payload) {
      throw new UnauthorizedException();
    }
    return { hotel: { id: payload.id, email: payload.email } };
  }
}
