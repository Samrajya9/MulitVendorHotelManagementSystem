import { PartialType } from '@nestjs/swagger';
import { CreateHotelEmployeeDto } from './create-hotel-employee.dto';

export class UpdateHotelEmployeeDto extends PartialType(CreateHotelEmployeeDto) {}
