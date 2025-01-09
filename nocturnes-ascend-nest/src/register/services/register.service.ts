// @nest
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

// @core
import { UserExistsException } from 'src/core/exceptions';

// @DI
import { CryptoService } from 'src/encription/services';

import { UserDocument, UserDocumentSafe } from 'src/dal';
import { UserRepository } from 'src/dal/mongoDB/repositories/user.repository';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  public constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  public async registerViaEmail(email: string, password: string): Promise<UserDocumentSafe> {
    let newUser: UserDocument | undefined;
    try {
      const existingUser: UserDocumentSafe = await this.userRepository.findOne({ email });

      if (existingUser) {
        throw new UserExistsException(email);
      }

      newUser = await this.userRepository.create({ email });

      newUser.password = await this.cryptoService.hashPassword(newUser.id, password);

      await newUser.save();

      return newUser;
    } catch (err) {
      // if (newUser) await this.userDeletionService.deleteUser(newUser._id);
      throw new InternalServerErrorException(err.message ? err.message : err);
    }
  }
}
