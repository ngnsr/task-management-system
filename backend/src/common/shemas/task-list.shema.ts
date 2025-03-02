import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Board } from './board.shema';
import { Task } from './task.shema';

@Schema({ timestamps: true })
export class TaskList extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
  board: Board;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks?: Task[];
}

export const TaskListSchema = SchemaFactory.createForClass(TaskList);
