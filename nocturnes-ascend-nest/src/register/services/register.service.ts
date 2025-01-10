// @nest
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// @core
import { UserExistsException } from 'src/core/exceptions';

// DI
import { UserRepository } from 'src/dal/mongoDB/repositories/user.repository';
import { BcryptService } from 'src/encription/services';

import { UserDocument, UserDocumentSafe } from 'src/dal';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  public constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  public async registerViaEmail(email: string, password: string): Promise<UserDocumentSafe> {
    let newUser: UserDocument | undefined;
    try {
      const existingUser: UserDocumentSafe = await this.userRepository.findOne({ email });

      if (existingUser) {
        throw new UserExistsException(email);
      }

      const hashedPassword = await this.bcryptService.hashPassword(password);
      newUser = await this.userRepository.create({ email, password: hashedPassword });

      return newUser;
    } catch (err) {
      // if (newUser) await this.userDeletionService.deleteUser(newUser._id);
      throw new InternalServerErrorException(err.message ? err.message : err);
    }
  }
}
