import { ApiProperty } from '@nestjs/swagger';
import { ErrorResponseClass } from './swagger.utlis.errorClass';

export class ErrorResponse {
  @ApiProperty({
    // enum: [false],
    example: false,
  })
  success: boolean;

  @ApiProperty({
    type: Object,
    nullable: true,
  })
  data: {} | null;

  @ApiProperty({
    type: ErrorResponseClass,
    nullable: true,
  })
  error: { message: string; description?: string; path: string };
}
