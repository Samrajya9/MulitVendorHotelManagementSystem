import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateHotelDto } from 'src/hotels/dto/create-hotel.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('hotel/signup')
  async hotelSignup(@Body()createHotelDto:CreateHotelDto){
    return await this.authService.HotelSignUp(createHotelDto)
  }
  // @Post('hotel/signin')
  // async hotelSignIn(){}
}
