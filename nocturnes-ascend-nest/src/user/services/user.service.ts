// @nest
import { Injectable, Logger } from '@nestjs/common';

import { UserRepository } from 'src/dal/mongoDB/repositories/user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  public constructor(private readonly userRepository: UserRepository) {}
}
