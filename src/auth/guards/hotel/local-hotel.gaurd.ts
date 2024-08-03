import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class LocalHotelAuthGaurd extends AuthGuard('localHotel'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('local Hotel Auth gaurd');
        return super.canActivate(context);
        
    }
}