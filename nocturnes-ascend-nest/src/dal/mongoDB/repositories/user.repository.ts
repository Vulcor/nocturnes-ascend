import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { User, UserDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) readonly userModel: Model<UserDocument>) {
    super(userModel);
  }

  public async create(createDocumentData: User): Promise<UserDocument> {
    const user = await this.userModel.create(createDocumentData);
    return user;
  }
}
