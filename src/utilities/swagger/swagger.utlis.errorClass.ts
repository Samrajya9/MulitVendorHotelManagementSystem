import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseClass {
  @ApiProperty({
    description: 'Error message',
    example: 'Error message',
  })
  message: string;

  @ApiProperty({
    description: 'Detailed description of the error',
    example: 'Error message',
  })
  description?: string;

  @ApiProperty({
    description: 'The path where the error occurred',
    example: '/hotels',
  })
  path: string;
}
