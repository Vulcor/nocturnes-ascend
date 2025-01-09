// @nest
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { UserService } from './services/user.service';
import { User, UserSchema } from 'src/dal';
import { UserRepository } from 'src/dal/mongoDB/repositories/user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
