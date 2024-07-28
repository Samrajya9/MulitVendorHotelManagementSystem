import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import GlobalResponse from 'src/utilities/global.response';

@Injectable()
export class GlobalInterceptors implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(`gobal interceptor request`);

    return next.handle().pipe(
      map((data): GlobalResponse<any> => {
        console.log(`gobal interceptor response`);
        return GlobalResponse.success(data);
      }),
      catchError((error) => {
        // const message = error.message;
        // const statusCode =
        //   error.response?.statusCode ||
        //   error.status ||
        //   HttpStatus.INTERNAL_SERVER_ERROR;
        // const description =
        //   error.options?.description ||
        //   error.response?.error ||
        //   'Internal server error';

        return throwError(
          // error can be modified from here if wanted but since interceptor are mainlly responsible for data operation error are handle in exceptio filters
          () => error,
          // new HttpException(
          //   message,
          //   statusCode,
          //   { cause: new Error(), description },

          //   // 'custom message',
          //   // 400,
          //   // {
          //   //   cause: new Error('Cause Error'),
          //   //   description: 'Some error description',
          //   // },
          // ),
        );
      }),
    );
  }
}
