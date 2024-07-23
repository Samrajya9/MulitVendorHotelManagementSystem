import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
  @ApiProperty({
    // enum: [true, false],
    example: true,
  })
  success: boolean;

  @ApiProperty({
    type: Object,
    nullable: true,
  })
  data: {} | null;
}
