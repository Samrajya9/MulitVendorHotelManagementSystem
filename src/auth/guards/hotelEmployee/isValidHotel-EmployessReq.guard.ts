import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsValidHotelEmployeeReq implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('IsValidHotelEmployeeReq guard activated');

    const request = context.switchToHttp().getRequest();
    const employeeHotelId = request.user?.hotel_id; // Extract hotel_id from the user object
    const paramHotelId = this.extractHotelIdFromParams(request);
    if (employeeHotelId === paramHotelId) {
      return true;
    } else {
      throw new ForbiddenException(
        `You do not have permission to perform this action for hotel ID ${paramHotelId}.`,
      );
    }
  }

  private extractHotelIdFromParams(request: any): number {
    return parseInt(request.params.hotel_id, 10); // Ensure it's an integer
  }
}
