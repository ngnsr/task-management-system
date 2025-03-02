import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from './user.shema';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  message: string;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
