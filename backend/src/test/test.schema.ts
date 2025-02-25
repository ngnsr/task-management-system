import { Schema, Document } from 'mongoose';

export const TestSchema = new Schema({
  name: { type: String, required: true },
});

export interface Test extends Document {
  name: string;
}
