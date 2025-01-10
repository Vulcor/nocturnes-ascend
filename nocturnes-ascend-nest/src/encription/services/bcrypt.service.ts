// @nest
import { Injectable, Logger } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly logger = new Logger(BcryptService.name);

  public constructor() {}

  public async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}
