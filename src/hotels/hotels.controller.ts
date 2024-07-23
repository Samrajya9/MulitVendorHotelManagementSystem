import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Global,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Hotels } from './entities/hotel.entity';
import GlobalResponse from 'src/utilities/global.response';
import { LoginHotelDto } from './dto/login-hotel.dto';
import { SuccessResponse } from 'src/utilities/swagger/swagger.utils.successResponse';
import { ErrorResponse } from 'src/utilities/swagger/swagger.utils.errorResponse';

@ApiTags('Hotels')
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post('singup')
  @ApiCreatedResponse({
    status: 201,
    description: `Hotel created succesfully`,
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 409,
    description: `Duplicate entry`,
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: ErrorResponse,
  })
  async create(@Body() createHotelDto: CreateHotelDto) {
    const result = await this.hotelsService.create(createHotelDto);
    return result;
  }

  @Post('login')
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
  async login(@Body() loginHotelDto: LoginHotelDto) {
    return await this.hotelsService.hotelogin(loginHotelDto);
  }
}
