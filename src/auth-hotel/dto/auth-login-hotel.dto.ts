import { IsEmail, IsString } from 'class-validator';

export class AuthLoginHotelDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
