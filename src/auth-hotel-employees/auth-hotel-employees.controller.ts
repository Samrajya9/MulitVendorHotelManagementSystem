import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthHotelEmployeesService } from './auth-hotel-employees.service';
import { CreateAuthHotelEmployeeDto } from './dto/create-auth-hotel-employee.dto';
import { HotelIsLoggedInGuard } from 'src/auth-hotel/guards/hotel-is-loggedin.guard';
import { JwtGuard } from 'src/auth-hotel/guards/jwt-auth.guard';
import { Request } from 'express';
import { AuthLoginHotelEmployeesDto } from './dto/auth-hotel-employees-login.dto';

@Controller('auth-hotel-employees')
@UseGuards(HotelIsLoggedInGuard, JwtGuard) 
export class AuthHotelEmployeesController {
  constructor(private readonly authHotelEmployeesService: AuthHotelEmployeesService) {}

  @Post('create')
  create(@Req() req:Request,@Body() createAuthHotelEmployeeDto: CreateAuthHotelEmployeeDto) {
   const hotel_Info = req.user as {id:number,email:string}
   const hotel_id = hotel_Info.id;
   createAuthHotelEmployeeDto.hotel_id = hotel_id;
   return this.authHotelEmployeesService.create(createAuthHotelEmployeeDto);
  }

 @Post('sign in')
 async signin(@Body() loginDto:AuthLoginHotelEmployeesDto){
  return this.authHotelEmployeesService.signin(loginDto)
 }
}
