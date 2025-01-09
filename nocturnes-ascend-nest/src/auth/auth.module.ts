// @nest
import { Module } from '@nestjs/common';

import { EncryptionModule } from 'src/encription/encryption.module';

import { AuthService } from './services';

@Module({
  imports: [EncryptionModule],
  controllers: [],
  providers: [AuthService],
})
export class AuthModule {}
