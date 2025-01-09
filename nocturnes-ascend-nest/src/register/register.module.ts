// @nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EncryptionModule } from 'src/encription/encryption.module';
import { RegisterController } from './controllers';
import { RegisterService } from './services';
import { User, UserSchema } from 'src/dal';
import { UserRepository } from 'src/dal/mongoDB/repositories/user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), EncryptionModule],
  controllers: [RegisterController],
  providers: [RegisterService, UserRepository],
})
export class RegisterModule {}
