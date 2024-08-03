import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateHotelDto } from 'src/hotels/dto/create-hotel.dto';
import { HotelLoginDTO } from './dto/hotel-login.dto';
import { Request, Response } from 'express';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { isloggedInHotelGuard } from './guards/hotel/isLoggedIn-hotel.guard';
import { CreateHotelEmployeeDto } from 'src/hotel-employees/dto/create-hotel-employee.dto';
import { JwtHotelGuard } from './guards/hotel/jwt-hotel.guard';
import { LocalHotelAuthGaurd } from './guards/hotel/local-hotel.guard';
import { HotelEmployeeLoginDTO } from './dto/hotelEmployee-login.dto';
import { LocalHotelEmployeeGuard } from './guards/hotelEmployee/local-hotelEmployee.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('hotel/signup')
  async hotelSignup(@Body() createHotelDto: CreateHotelDto) {
    return await this.authService.HotelSignUp(createHotelDto);
  }

  @Post('hotel/signin')
  @UseGuards(LocalHotelAuthGaurd)
  async hotelSignIn(@Req() req: Request, @Res() res: Response, @Body() hotelLoginDto: HotelLoginDTO) {
    const hotelInfo = req.user as Hotels;
    const payload = { id: hotelInfo.id, email: hotelInfo.email };
    const result = await this.authService.HotelLogin(res, payload);
    res.json(result);
  }

  @Post('hotel/signout')
  @UseGuards(isloggedInHotelGuard)
  async hotelSignOut(@Res() res: Response) {
    const result = await this.authService.signout(res);
    res.json(result);
  }

  @Post('hotelEmployee/signup')
  @UseGuards(isloggedInHotelGuard, JwtHotelGuard)
  async hotelEmployeeSignUp(@Req() req: Request, @Body() createHotelEmployeeDto: CreateHotelEmployeeDto) {
    const hotelInfo = req.user as { id: number, email: string };
    createHotelEmployeeDto.hotel_id = hotelInfo.id;
    const result = await this.authService.HotelEmployeeSignUp(createHotelEmployeeDto);
    return result;
  }
  @Post('hotelEmployee/signin')
  @UseGuards(LocalHotelEmployeeGuard)
  async hotelEmployeeSignin(@Req() req: Request,@Res() res: Response,@Body() hotelEmployeeLoginDto :HotelEmployeeLoginDTO){
    const result = await this.authService.HotelEmployeeLgin(res,hotelEmployeeLoginDto)
    res.json(result);
  }
}
