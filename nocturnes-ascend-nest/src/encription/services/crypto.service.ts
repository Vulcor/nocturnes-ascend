// @nest
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { SaltRepository } from 'src/dal/mongoDB/repositories/salt.repository';

import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  private readonly logger = new Logger(CryptoService.name);

  public constructor(private readonly saltRepository: SaltRepository) {}

  public async hashPassword(userId: string, password: string): Promise<string> {
    const salt: string = crypto.randomBytes(128).toString('base64');

    let hashedPassword;
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw new InternalServerErrorException(err?.message || err);
      hashedPassword = hash;
    });

    await this.saltRepository.create({ user: userId, salt });

    return hashedPassword;
  }
}
