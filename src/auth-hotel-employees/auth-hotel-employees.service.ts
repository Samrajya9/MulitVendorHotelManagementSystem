import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthHotelEmployeeDto } from './dto/create-auth-hotel-employee.dto';
import { UpdateAuthHotelEmployeeDto } from './dto/update-auth-hotel-employee.dto';
import { HotelEmployeesService } from 'src/hotel-employees/hotel-employees.service';
import * as bcrypt from 'bcrypt';
import { AuthLoginHotelEmployeesDto } from './dto/auth-hotel-employees-login.dto';
import { plainToInstance } from 'class-transformer';
import { HotelEmployees } from 'src/hotel-employees/entities/hotel-employee.entity';
import { JwtService } from '@nestjs/jwt';
import { AppJwtService } from 'src/utilities/jwt/jwtService';

@Injectable()
export class AuthHotelEmployeesService {
  constructor(private hotelEmployeesService:HotelEmployeesService,
    private appjwtService :AppJwtService  
  ){}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }  


  
  async create(createAuthHotelEmployeeDto: CreateAuthHotelEmployeeDto) {
    const employee = await  this.hotelEmployeesService.getEmployeesByEmail(createAuthHotelEmployeeDto.email)
    if(employee != null){
      throw new ConflictException("Employee with the email alreday exist")
    }
    createAuthHotelEmployeeDto.password =await this.hashPassword(createAuthHotelEmployeeDto.password);
    createAuthHotelEmployeeDto.join_date = new Date(); 
    const newEmployee = await this.hotelEmployeesService.create(createAuthHotelEmployeeDto);
    return newEmployee
  }

  async validateEmployee(loginDto:AuthLoginHotelEmployeesDto){
    const employee = await  this.hotelEmployeesService.getEmployeesByEmail(loginDto.email)
    if(employee == null){
      throw new NotFoundException("User doesnt exist")
    }
    const passwordMatch = bcrypt.compare(loginDto.password,employee.password)
    if(!passwordMatch){
      throw new UnauthorizedException("Password didn't match")
    }
    const employee_details = plainToInstance(HotelEmployees,employee)

  }
  async signin(loginDto:AuthLoginHotelEmployeesDto){}
  findAll() {
    return `This action returns all authHotelEmployees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authHotelEmployee`;
  }

  update(id: number, updateAuthHotelEmployeeDto: UpdateAuthHotelEmployeeDto) {
    return `This action updates a #${id} authHotelEmployee`;
  }

  remove(id: number) {
    return `This action removes a #${id} authHotelEmployee`;
  }
}
