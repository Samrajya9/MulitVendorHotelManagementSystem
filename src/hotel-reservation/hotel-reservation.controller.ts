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
  ParseIntPipe,
} from '@nestjs/common';
import { HotelReservationService } from './hotel-reservation.service';
import { CreateHotelReservationDto } from './dto/create-hotel-reservation.dto';
import { UpdateHotelReservationDto } from './dto/update-hotel-reservation.dto';
import { JwtHotelEmployeeGuard } from 'src/auth/guards/hotelEmployee/jwt-hotelEmployee.guard';
import e, { Request } from 'express';
import { HotelEmployees } from 'src/hotel-employees/entities/hotel-employee.entity';

@UseGuards(JwtHotelEmployeeGuard)
@Controller('hotel-reservation')
export class HotelReservationController {
  constructor(
    private readonly hotelReservationService: HotelReservationService,
  ) {}

  @Post()
  createReservation(
    @Req() req: Request,
    @Body() createHotelReservationDto: CreateHotelReservationDto,
  ) {
    const employee = req.user as HotelEmployees;
    const hotel_id = employee.hotel_id;
    createHotelReservationDto.hotel_id = hotel_id;
    const result = this.hotelReservationService.createReservation(
      createHotelReservationDto,
    );
    return result;
  }

  @Get()
  findAllReservation(@Req() req: Request) {
    const employee = req.user as HotelEmployees;
    const hotel_id = employee.hotel_id;
    const result = this.hotelReservationService.findAllReservation(hotel_id);
    return result;
  }

  @Get(':reseravtion_id')
  findOneReservation(
    @Req() req: Request,
    @Param('reseravtion_id', ParseIntPipe) reseravtion_id: number,
  ) {
    const employee = req.user as HotelEmployees;
    const hotel_id = employee.hotel_id;
    const result = this.hotelReservationService.findOneReservation(
      hotel_id,
      reseravtion_id,
    );
    return result;
  }

  @Patch(':reseravtion_id')
  async updateReservation(
    @Req() req: Request,
    @Param('reseravtion_id', ParseIntPipe) reseravtion_id: number,
    @Body() updateHotelReservationDto: UpdateHotelReservationDto,
  ) {
    const employee = req.user as HotelEmployees;
    const hotel_id = employee.hotel_id;
    const result = await this.hotelReservationService.updateReservation(
      hotel_id,
      reseravtion_id,
      updateHotelReservationDto,
    );
    return result;
  }

  @Delete(':reseravtion_id')
  async deleteReservation(
    @Req() req: Request,
    @Param('reseravtion_id', ParseIntPipe) reseravtion_id: number,
  ) {
    const employee = req.user as HotelEmployees;
    const hotel_id = employee.hotel_id;
    const result = await this.hotelReservationService.deleteReservation(
      hotel_id,
      reseravtion_id,
    );
    return result;
  }
}
