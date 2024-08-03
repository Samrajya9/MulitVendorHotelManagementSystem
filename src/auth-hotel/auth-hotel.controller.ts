import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthHotelService } from './auth-hotel.service';
import { AuthLoginHotelDto } from './dto/auth-login-hotel.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { CreateHotelDto } from 'src/hotels/dto/create-hotel.dto';
import { HotelIsLoggedInGuard } from './guards/hotel-is-loggedin.guard';

@Controller('auth-hotel')
export class AuthHotelController {
  constructor(private readonly authHotelService: AuthHotelService) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signin(
    @Req() req: Request,
    @Res() res: Response,
    @Body() authLoginHotelDto: AuthLoginHotelDto,
  ) {
    console.log(req.user);
    const hotelInfo = req.user as Hotels;
    const payload = { id: hotelInfo.id, email: hotelInfo.email };
    const result = await this.authHotelService.login(res, payload);
    res.json(result);
  }

  @Post('signup')
  async signup(@Body() createHotelDto: CreateHotelDto) {
    return await this.authHotelService.signup(createHotelDto);
  }

  @Post('signout')
  @UseGuards(HotelIsLoggedInGuard)
  async signout(@Req() req: Request, @Res() res: Response) {
    console.log('Cookies in Controller:', req.cookies);

    const result = await this.authHotelService.signout(req, res);
    res.json(result);
  }
}
