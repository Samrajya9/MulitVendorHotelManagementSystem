import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class HotelIsLoggedInGuard  implements CanActivate{
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      console.log(request.cookies.refreshToken);
      if(request.cookies.refreshToken != undefined){
        return true
      }
      return false
  }
}
