import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty({
    description: `email of the user`,
    example: `phinix1@gmail.com`,
  })
  email: string;

  @ApiProperty({
    example: `password123`,
  })
  password: string;

  @ApiProperty({
    description: `Name of the hotel`,
    example: `Great Vision Treak`,
  })
  name: string;

  @ApiProperty({
    description: `Address of the hotel`,
    example: `Anamnagar`,
  })
  address: string;
}
