import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelReservationService } from './hotel-reservation.service';
import { CreateHotelReservationDto } from './dto/create-hotel-reservation.dto';
import { UpdateHotelReservationDto } from './dto/update-hotel-reservation.dto';

@Controller('hotel-reservation')
export class HotelReservationController {
  constructor(private readonly hotelReservationService: HotelReservationService) {}

  @Post()
  create(@Body() createHotelReservationDto: CreateHotelReservationDto) {
    return this.hotelReservationService.create(createHotelReservationDto);
  }

  @Get()
  findAll() {
    return this.hotelReservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelReservationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelReservationDto: UpdateHotelReservationDto) {
    return this.hotelReservationService.update(+id, updateHotelReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelReservationService.remove(+id);
  }
}
