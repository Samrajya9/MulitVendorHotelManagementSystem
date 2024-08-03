import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelEmployeesService } from './hotel-employees.service';
import { CreateHotelEmployeeDto } from './dto/create-hotel-employee.dto';
import { UpdateHotelEmployeeDto } from './dto/update-hotel-employee.dto';

@Controller('hotel-employees')
export class HotelEmployeesController {
  constructor(private readonly hotelEmployeesService: HotelEmployeesService) {}

  @Post()
  create(@Body() createHotelEmployeeDto: CreateHotelEmployeeDto) {
    return this.hotelEmployeesService.create(createHotelEmployeeDto);
  }

  @Get()
  findAll() {
    return this.hotelEmployeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelEmployeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelEmployeeDto: UpdateHotelEmployeeDto) {
    return this.hotelEmployeesService.update(+id, updateHotelEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelEmployeesService.remove(+id);
  }
}
