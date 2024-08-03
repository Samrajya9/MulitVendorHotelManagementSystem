import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Global,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/utilities/swagger/swagger.utils.successResponse';
import { ErrorResponse } from 'src/utilities/swagger/swagger.utils.errorResponse';
import { HotelInterceptors } from 'src/Interceptors/hotel.interceptors';

@ApiTags('Hotels')
@Controller('hotels')
@UseInterceptors(HotelInterceptors)
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

}
