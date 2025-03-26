import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ versionKey: false })
export class Admin {
  
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types .ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'admin' })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
