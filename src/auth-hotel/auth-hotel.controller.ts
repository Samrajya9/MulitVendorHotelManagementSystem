import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthHotelService } from './auth-hotel.service';
import { AuthLoginHotelDto } from './dto/auth-login-hotel.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { CreateHotelDto } from 'src/hotels/dto/create-hotel.dto';

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
    const hotelInfo = req.user as Hotels;
    const payload = { id: hotelInfo.id, email: hotelInfo.email };
    const result = await this.authHotelService.login(payload);
    const { accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Use 'true' if you're using HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
    return res.send({ accessToken });
  }

  @Post('signup')
  async signup(@Body() createHotelDto: CreateHotelDto) {
    return await this.authHotelService.signup(createHotelDto);
  }
}
