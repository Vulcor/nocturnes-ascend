// @nest
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// @DI
import { RegisterService } from '../services';

import { RegisterDto } from '../dtos';
import { User } from 'src/dal';

@Controller('register')
@ApiTags('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.registerService.registerViaEmail(registerDto.email, registerDto.password);
  }
}
