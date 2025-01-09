import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { Salt, SaltDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SaltRepository extends BaseRepository<SaltDocument> {
  constructor(@InjectModel(Salt.name) readonly saltModel: Model<SaltDocument>) {
    super(saltModel);
  }

  public async create(createDocumentData: Salt): Promise<SaltDocument> {
    const user = await this.saltModel.create(createDocumentData);
    return user;
  }
}
