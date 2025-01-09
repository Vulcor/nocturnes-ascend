import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: true } })
export class User {
  @Prop({ unique: true, index: true })
  email?: string;

  @Prop()
  password?: string;
}
export type UserSafe = Omit<User, 'password'>;

export type UserDocument = Document & User;
export type UserDocumentSafe = Omit<UserDocument, 'password'>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
