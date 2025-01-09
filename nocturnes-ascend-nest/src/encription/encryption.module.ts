// @nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CryptoService } from './services';
import { SaltRepository } from 'src/dal/mongoDB/repositories/salt.repository';
import { Salt, SaltSchema } from 'src/dal';

@Module({
  imports: [MongooseModule.forFeature([{ name: Salt.name, schema: SaltSchema }])],
  providers: [CryptoService, SaltRepository],
  exports: [CryptoService],
})
export class EncryptionModule {}
