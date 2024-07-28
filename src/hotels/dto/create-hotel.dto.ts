import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class CreateHotelDto {
  @ApiProperty({
    description: `email of the user`,
    example: `phinix1@gmail.com`,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: `password123`,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: `Name of the hotel`,
    example: `Great Vision Treak`,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: `Address of the hotel`,
    example: `Anamnagar`,
  })
  @IsString()
  address: string;
}
