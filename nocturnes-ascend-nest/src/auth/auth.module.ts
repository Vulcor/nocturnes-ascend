// @nest
import { Module } from '@nestjs/common';

import { AuthService } from './services';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService],
})
export class AuthModule {}
