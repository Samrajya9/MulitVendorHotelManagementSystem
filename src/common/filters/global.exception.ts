import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import GlobalResponse from 'src/utilities/global.response';
import { QueryFailedError } from 'typeorm';

@Catch()
export default class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.log(exception);

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Handle QueryFailedError specifically
    if (exception instanceof QueryFailedError) {
      // Customize the status and message for specific error codes
      if ((exception as any).code === '23505') {
        // Unique violation error code
        status = HttpStatus.CONFLICT;
        message = exception.message;
      } else {
        message = 'Database query error';
      }
    }

    const description =
      exception.options?.description || exception.detail || 'An error occurred';
    const errorResponse = GlobalResponse.failure(
      typeof message === 'object' && message.hasOwnProperty('message')
        ? (message as any).message
        : message,
      description,
      request.url,
    );

    response.status(status).json(errorResponse);
  }
}
