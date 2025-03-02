import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from './user.shema';

@Schema({ timestamps: true })
export class Integration extends Document {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  config: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}
export const IntegrationSchema = SchemaFactory.createForClass(Integration);
