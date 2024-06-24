import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import GlobalResponse from 'src/utilities/global.response';

@Catch()
export default class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.log(exception.options);

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const description =
      exception.options?.description || exception.getResponse().error;

    const errorResponse = GlobalResponse.failure(
      typeof message === 'object' && message.hasOwnProperty('message')
        ? (message as any).message
        : message,
      description,
      request.url,
    );

    response.status(status).json({
      ...errorResponse,
    });
  }
}
