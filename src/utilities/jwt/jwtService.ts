import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppJwtService {
    constructor(private jwtService: JwtService){}
     
    async createJwtToken<T extends object>(
        payload: T,
        options?: { expiresIn?: string | number },
      ): Promise<string> {
        return options
          ? this.jwtService.sign(payload, options)
          : this.jwtService.sign(payload);
      }
}