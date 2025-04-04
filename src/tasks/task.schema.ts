import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, enum: ['todo', 'in-progress', 'done'], default: 'todo' })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
