import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Task } from './task.shema';

@Schema()
export class TimeLog extends Document {
  @Prop({ required: true })
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({ type: Types.ObjectId, ref: 'Task' })
  task: Task;
}
export const TimeLogSchema = SchemaFactory.createForClass(TimeLog);
