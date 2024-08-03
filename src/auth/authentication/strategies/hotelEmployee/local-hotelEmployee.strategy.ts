import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";
import { HotelEmployeeLoginDTO } from "src/auth/dto/hotelEmployee-login.dto";

@Injectable()
export class LocaHotelEmployeeStrategy extends PassportStrategy(Strategy,'localHotelEmployeeStrategy'){
    constructor(private authService:AuthService){
        super({ usernameField: 'email', passwordField: 'password' })
    }   
    async validate(email: string, password: string){
        try {
            console.log(`Local HotelEmployee Startegy activated`);
            const hotelEmployeeLoginDto:HotelEmployeeLoginDTO ={email,password}
            const employee = await this.authService.validateHotelEmployee(hotelEmployeeLoginDto)
            return employee;
        } catch (error) {
            throw error;

        }
    } 
}