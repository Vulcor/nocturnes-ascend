import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserDocument } from './user.schema';

@Schema({ timestamps: { createdAt: true } })
export class Salt {
  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true } })
  user: string | UserDocument;

  @Prop({ required: true })
  salt: string;
}

export type SaltDocument = Document & Salt;

export const SaltSchema = SchemaFactory.createForClass(Salt);
