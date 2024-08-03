import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtHotelStrategy  extends PassportStrategy(Strategy,'jwtHotelStrategy'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secert', // Ensure the secret key is correct
        })
    }
    async validate(payload:any){
        console.log(`Jwt Hotel Strategy activated`);
        console.log(payload);
        return { id: payload.id, email: payload.email  };
    }
}