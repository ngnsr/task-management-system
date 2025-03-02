import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Task } from './task.shema';
import { FileType } from '../enums';

@Schema({ timestamps: true })
export class File extends Document {
  @Prop({ required: true })
  originalName: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true, enum: FileType })
  fileType: FileType;

  @Prop({ required: true })
  mimeType: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  task: Task;

  @Prop({ required: true })
  size: number;

  @Prop()
  description?: string;

  @Prop()
  tags?: string[];

  @Prop({ default: Date.now })
  uploadedAt: Date; // Дата завантаження
}

export const FileSchema = SchemaFactory.createForClass(File);
