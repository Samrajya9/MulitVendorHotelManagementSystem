import { Module } from '@nestjs/common';
import { HotelEmployeesService } from './hotel-employees.service';
import { HotelEmployeesController } from './hotel-employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelEmployees } from './entities/hotel-employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEmployees])],
  controllers: [HotelEmployeesController],
  providers: [HotelEmployeesService],
  exports:[HotelEmployeesService]
})
export class HotelEmployeesModule {}
