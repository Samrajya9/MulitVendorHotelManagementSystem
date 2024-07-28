import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class LoginAuthHotel {
  @ApiProperty({
    description: `email of the user`,
    example: `phinix1@gmail.com`,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: `password123`,
  })
  password: string;
}
