import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Workspace } from './workspace.shema';

@Schema({ timestamps: true })
export class Team extends Document {
  @Prop({ required: true })
  name: string;

  // maybe change to multiple workspaces idn
  @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
  workspace: Workspace;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Board' }] })
  boards: Types.ObjectId[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
