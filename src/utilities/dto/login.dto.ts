import { IsEmail, IsString } from 'class-validator';

export class CommonLoginDTO{
    @IsEmail()
    email: string;
  
    @IsString()
    password: string;
  }
  


