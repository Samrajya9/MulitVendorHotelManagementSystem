import { ApiProperty } from '@nestjs/swagger';

export class LoginHotelDto {
  @ApiProperty({
    description: `email of the user`,
    example: `phinix1@gmail.com`,
  })
  email: string;

  @ApiProperty({
    example: `password123`,
  })
  password: string;
}
