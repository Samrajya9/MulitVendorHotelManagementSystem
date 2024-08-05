import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class LocalHotelEmployeeGuard extends AuthGuard('localHotelEmployeeStrategy'){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log(`Local HotelEmployee Guard Activated`);
        const request = context.switchToHttp().getRequest()
        // const hotel_id = request.        
        return super.canActivate(context);
        
    }
}   