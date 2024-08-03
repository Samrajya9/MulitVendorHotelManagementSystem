import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtHotelGuard extends AuthGuard('jwtHotelStrategy'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Jwt Hotel Auth gaurd activated');
        return super.canActivate(context);
    }
}