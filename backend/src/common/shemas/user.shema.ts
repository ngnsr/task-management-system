import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Workspace } from './workspace.shema';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Workspace',
    required: true,
  })
  workspaces: Workspace[];
}
export const UserSchema = SchemaFactory.createForClass(User);
