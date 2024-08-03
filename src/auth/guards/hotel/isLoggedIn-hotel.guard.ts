import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class isloggedInHotelGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('isloggedInHotelGuard activated');
        if (request.cookies.refreshToken != undefined) {
          return true;
        }
        return false;
      }
}