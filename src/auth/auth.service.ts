import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { HotelEmployeesService } from 'src/hotel-employees/hotel-employees.service';
import { HotelsService } from 'src/hotels/hotels.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { Hotels } from 'src/hotels/entities/hotel.entity';
import { HotelLoginDTO } from './dto/hotel-login.dto';
import { HotelEmployeeLoginDTO } from './dto/hotelEmployee-login.dto';
import { HotelEmployees } from 'src/hotel-employees/entities/hotel-employee.entity';
import { Request, Response } from 'express';
import { CreateHotelDto } from 'src/hotels/dto/create-hotel.dto';
import { CreateHotelEmployeeDto } from 'src/hotel-employees/dto/create-hotel-employee.dto';

@Injectable()
export class AuthService {
    constructor(private readonly hotelService :HotelsService,
        private readonly hotelEmployeeServie:HotelEmployeesService,
        private jwtService: JwtService,
     ){}

     private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
      }

      private async createJwtToken<T extends object>(
        payload: T,
        options?: { expiresIn?: string | number },
      ): Promise<string> {
        return options
          ? this.jwtService.sign(payload, options)
          : this.jwtService.sign(payload);
      }
    async HotelSignUp(createHotelDto:CreateHotelDto){
        const hotel = await this.hotelService.getHotelByEmail(createHotelDto.email);
        if(hotel!=null){
            throw new ConflictException(
                `User found with email ${createHotelDto.email}. Please use a different email.`,
              );
        }
        const hashedPassword = await this.hashPassword(createHotelDto.password);
        createHotelDto.password =hashedPassword;
        const newHotel =  await this.hotelService.create(createHotelDto);
        const result =plainToInstance(Hotels,newHotel);
        return result;

    }
    async HotelEmployeeSignUp(createHotelEmployeeDto:CreateHotelEmployeeDto){
        const employee = await this.hotelEmployeeServie.getEmployeesByEmail(createHotelEmployeeDto.email);
        if(employee != null){
            throw new ConflictException("Employee with the email alreday exist")
          }
          createHotelEmployeeDto.password =await this.hashPassword(createHotelEmployeeDto.password);
          if(createHotelEmployeeDto.join_date == null){
            createHotelEmployeeDto.join_date = new Date(); 
          }
          const newEmployee = await this.hotelEmployeeServie.create(createHotelEmployeeDto);
          const result = plainToInstance(HotelEmployees,newEmployee);
          return result;
    }
    async validateHotel(loginDto: HotelLoginDTO) {
        const hotel = await this.hotelService.getHotelByEmail(
            loginDto.email,
        );
        if (hotel == null) {
          throw new NotFoundException(`User not found with that email`, {
            cause: `No user found with email in database`,
            description: `User with email ${loginDto.email} not found`,
          });
        }
        const comparePassword = await bcrypt.compare(
            loginDto.password,
            hotel.password,
        );
        if (!comparePassword) {
          throw new UnauthorizedException(`Unauthorized`, {
            cause: ``,
            description: `Password did not match`,
          });
        }
        const hotel_details =plainToInstance(Hotels, hotel)
        return hotel_details;
      }

      async validateHotelEmployee(loginDto:HotelEmployeeLoginDTO){
        const employee = await  this.hotelEmployeeServie.getEmployeesByEmail(loginDto.email)
        if(employee == null){
          throw new NotFoundException("User doesnt exist")
        }
        const passwordMatch = bcrypt.compare(loginDto.password,employee.password)
        if(!passwordMatch){
          throw new UnauthorizedException("Password didn't match")
        }
        const employee_details = plainToInstance(HotelEmployees,employee)
        return employee_details;
      }

      async HotelLogin(res: Response, payload: {}){
        const accessToken = await this.createJwtToken(payload);
        const refreshToken = await this.createJwtToken(payload, {
            expiresIn: '7d',
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Use 'true' if you're using HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });
      return { success: true, data: { accessToken } };
    }

    async HotelEmployeeLgin(res: Response, payload: {}){
        const accessToken = await this.createJwtToken(payload);
        const refreshToken = await this.createJwtToken(payload, {
            expiresIn: '7d',
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true, // Use 'true' if you're using HTTPS
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });
      return { success: true, data: { accessToken } };

    }
      async isloggedIn(req: Request){
        return req.cookies;
      }

      async signout(res: Response) {
        res.clearCookie('refreshToken');
        return {success: true,data:'sign out'};
      }
}
