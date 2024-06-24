import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, cause: any, status: number) {
    super({ message, cause }, status);
  }
}
