import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";
import { HotelLoginDTO } from "src/auth/dto/hotel-login.dto";

@Injectable()
export class LocalHotelStrategy extends PassportStrategy(Strategy,'localHotel'){
    constructor(private authService:AuthService){
        super({ usernameField: 'email', passwordField: 'password' })
    }
    async validate(email: string, password: string){
        try {
            console.log(`local Hotel strategy`);
            const hotelLoginDTO:HotelLoginDTO = {email,password};
            const hotel = await this.authService.validateHotel(hotelLoginDTO);
            return hotel;
        } catch (error) {
            throw error;
        }
    }
}