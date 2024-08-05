import { Injectable } from '@nestjs/common';
import { CreateHotelEmployeeDto } from './dto/create-hotel-employee.dto';
import { UpdateHotelEmployeeDto } from './dto/update-hotel-employee.dto';
import { HotelEmployees } from './entities/hotel-employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HotelEmployeesService {
  constructor(
    @InjectRepository(HotelEmployees)
    private HotelEmployeeRepo: Repository<HotelEmployees>,
  ) {}

async create(createHotelEmployeeDto: CreateHotelEmployeeDto):Promise<HotelEmployees> {
    const newEmployees =this.HotelEmployeeRepo.create(createHotelEmployeeDto);
    return this.HotelEmployeeRepo.save(newEmployees)
}

async getEmployeesByEmail(email:string):Promise<HotelEmployees | null>{
  return await this.HotelEmployeeRepo.findOne({where:{email}})
}
async getEmployeesByEmailandHotelId(email: string, hotel_id: number): Promise<HotelEmployees[]> {
  return this.HotelEmployeeRepo.find({
    where: {
      email: email,
      hotel_id: hotel_id,
    },
  });
}
  findAll() {
    return `This action returns all hotelEmployees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelEmployee`;
  }

  update(id: number, updateHotelEmployeeDto: UpdateHotelEmployeeDto) {
    return `This action updates a #${id} hotelEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelEmployee`;
  }
}
