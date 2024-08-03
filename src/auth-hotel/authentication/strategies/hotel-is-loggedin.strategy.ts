// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Request } from 'express';
// import { Strategy } from 'passport-local';
// import { AuthHotelService } from 'src/auth-hotel/auth-hotel.service';

// @Injectable()
// export class HotelIsLoggedIn extends PassportStrategy(Strategy, 'hotelIsLoggedIn') {
//   constructor(private authHotelService:AuthHotelService) {
//     super({
//       passReqToCallback: true, // Ensure req object is passed
//     });
//   }

//   async validate(req: Request): Promise<any> {
//     const result  =  await this.authHotelService.isloggedIn(req)
//     if(result.cookies.refreshToken != undefined){
//       throw new UnauthorizedException('Hotel is not logged in ')
//     }
//     return true
//   }
// }
