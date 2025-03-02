import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Workspace } from './workspace.shema';
import { TaskList } from './task-list.shema';

@Schema({ timestamps: true })
export class Board extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
  workspace: Workspace;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TaskList' }] })
  lists?: TaskList[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
