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
import { HotelRoomsService } from './hotel-rooms.service';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';
import { JwtHotelEmployeeGuard } from 'src/auth/guards/hotelEmployee/jwt-hotelEmployee.guard';
import { Request } from 'express';
import { HotelEmployees } from 'src/hotel-employees/entities/hotel-employee.entity';
import { IsValidHotelEmployeeReq } from 'src/auth/guards/hotelEmployee/isValidHotel-EmployessReq.guard';
@UseGuards(JwtHotelEmployeeGuard, IsValidHotelEmployeeReq)
@Controller('hotel-rooms')
export class HotelRoomsController {
  constructor(private readonly hotelRoomsService: HotelRoomsService) {}

  @Post(':hotel_id')
  async createHotelRoom(
    @Req() req: Request,
    @Body() createHotelRoomDto: CreateHotelRoomDto,
  ) {
    console.log(`user`);
    console.log(req.user);
    const employee = (await req.user) as HotelEmployees;
    createHotelRoomDto.hotel_id = employee.hotel_id;
    return this.hotelRoomsService.createRoom(createHotelRoomDto);
  }

  @Get(':hotel_id')
  findAllHotelRooms(@Param('hotel_id', ParseIntPipe) hotel_id: number) {
    return this.hotelRoomsService.findAllRooms(hotel_id);
  }

  @Get(':hotel_id/:room_id')
  findOneHotelRoom(
    @Param('hotel_id', ParseIntPipe) hotel_id: number,
    @Param('room_id', ParseIntPipe) room_id: number,
  ) {
    return this.hotelRoomsService.findOneRoom(hotel_id, room_id);
  }

  @Patch(':hotel_id/:room_id')
  updateRoom(
    @Param('hotel_id', ParseIntPipe) hotel_id: number,
    @Param('room_id', ParseIntPipe) room_id: number,
    @Body() updateHotelRoomDto: UpdateHotelRoomDto,
  ) {
    return this.hotelRoomsService.updateRoom(
      hotel_id,
      room_id,
      updateHotelRoomDto,
    );
  }

  @Delete(':hotel_id/:room_id')
  removeRoom(
    @Param('hotel_id', ParseIntPipe) hotel_id: number,
    @Param('room_id', ParseIntPipe) room_id: number,
  ) {
    return this.hotelRoomsService.deleteRoom(hotel_id, room_id);
  }
}
