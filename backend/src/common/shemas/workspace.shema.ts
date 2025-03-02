import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.shema';
import { Board } from './board.shema';

@Schema({ timestamps: true })
export class Workspace extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  members: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Board' }] })
  boards?: Board[];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
