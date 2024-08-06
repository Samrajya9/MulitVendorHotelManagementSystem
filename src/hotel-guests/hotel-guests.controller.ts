import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HotelGuestsService } from './hotel-guests.service';
import { JwtHotelEmployeeGuard } from 'src/auth/guards/hotelEmployee/jwt-hotelEmployee.guard';
import { Request } from 'express';
import { HotelEmployees } from 'src/hotel-employees/entities/hotel-employee.entity';
import { CreatHotelGuestDto } from './dto/create-hotel-guest.dto';
import { HotelGuests } from './entities/hotel-guests.entity';
import { UpdateHotelGuestDto } from './dto/update-hotel-guest.dto';

@Controller('hotel-guests')
@UseGuards(JwtHotelEmployeeGuard)
export class HotelGuestsController {
  constructor(private readonly hotelGuestsService: HotelGuestsService) {}

  @Post()
  async createGuest(
    @Req() req: Request,
    @Body() createGuestDto: CreatHotelGuestDto,
  ) {
    const employee = req.user as HotelEmployees;
    const hotel_id = employee.hotel_id;
    createGuestDto.hotel_id = hotel_id;
    console.log(createGuestDto);
    return this.hotelGuestsService.createGuest(createGuestDto);
  }

  @Get()
  async getAllGuests(@Req() req: Request): Promise<HotelGuests[] | null> {
    const employee = req.user as HotelEmployees;
    const hotel_id = employee.hotel_id;
    const result = await this.hotelGuestsService.findAllGuets(hotel_id);
    return result;
  }

  @Get(':guest_id')
  async getGuest(
    @Req() req: Request,
    @Param('guest_id', ParseIntPipe) guest_id: number,
  ) {
    const employee = req.user as HotelEmployees;
    const hotel_id = employee.hotel_id;
    const result = await this.hotelGuestsService.findGuest(hotel_id, guest_id);
    return result;
  }

  @Patch(':guest_id')
  async updateGuest(
    @Req() req: Request,
    @Param('guest_id', ParseIntPipe) guest_id: number,
    @Body() updateHotelGuestDto: UpdateHotelGuestDto,
  ) {
    const employee = req.user as HotelEmployees;
    const hotel_id = employee.hotel_id;
    const result = await this.hotelGuestsService.updateGuest(
      hotel_id,
      guest_id,
      updateHotelGuestDto,
    );
    return result;
  }
  @Delete(':guest_id')
  async deleteGuest(
    @Req() req: Request,
    @Param('guest_id', ParseIntPipe) guest_id: number,
  ) {
    const employee = req.user as HotelEmployees;
    const hotel_id = employee.hotel_id;
    const result = await this.hotelGuestsService.deleteGuest(
      hotel_id,
      guest_id,
    );
    return result;
  }
}
