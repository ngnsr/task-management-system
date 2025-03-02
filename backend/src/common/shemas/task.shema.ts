import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.shema';
import { TimeLog } from './time-log.shema';
import { File } from './file.shema';
import { TaskStatus } from '../enums';

@Schema({ timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description?: string;

  @Prop({
    required: true,
    enum: TaskStatus,
    default: TaskStatus.toDo,
  })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Task' })
  parentTask?: Task;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  subtasks: Task[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TimeLog' }] })
  timeLogs: TimeLog[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'File' }] })
  files: File[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
