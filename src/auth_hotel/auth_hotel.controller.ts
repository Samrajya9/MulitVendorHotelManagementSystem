import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthHotelService } from './auth_hotel.service';
import { LoginAuthHotel } from './dto/login-auth_hotel.dto';
import { LocalGuard } from 'src/guards/local.guard';
import { Request, Response } from 'express';
import {
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/utilities/swagger/swagger.utils.errorResponse';
import { SuccessResponse } from 'src/utilities/swagger/swagger.utils.successResponse';

@Controller('auth-hotel')
export class AuthHotelController {
  constructor(private authHotelService: AuthHotelService) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    description: 'User that email not found',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 200,
    description: `Logged in Successfull`,
    type: SuccessResponse,
  })
  async signin(
    @Req() req: any,
    @Res({ passthrough: true }) response: Response,
    @Body() login_auth_hotel_dto: LoginAuthHotel,
  ) {
    const hotel = req.user;
    const { id, email } = req.user;
    const jwt = await this.authHotelService.createJWT({ id, email });
    response.cookie('accessToken', jwt);
    return { hotel, accessToken: jwt };
  }
}
