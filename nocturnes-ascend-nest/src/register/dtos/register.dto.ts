import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsDefined()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  @IsDefined()
  @IsStrongPassword(
    { minLowercase: 1, minUppercase: 1, minSymbols: 1 },
    { message: 'password must contain a lowercase letter, uppercase letter and a special character.' },
  )
  password: string;
}
