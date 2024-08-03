import { PartialType } from '@nestjs/swagger';
import { CreateAuthHotelEmployeeDto } from './create-auth-hotel-employee.dto';

export class UpdateAuthHotelEmployeeDto extends PartialType(CreateAuthHotelEmployeeDto) {}
