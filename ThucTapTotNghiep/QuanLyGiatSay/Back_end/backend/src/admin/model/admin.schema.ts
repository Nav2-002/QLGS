import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ versionKey: false })
export class Admin {
  
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types .ObjectId;

  @Prop({ required: true })
  ten: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  mat_khau: string;

  @Prop({ default: 'admin' })
  vaitro: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Cuahang' })
  id_cuahang: Types.ObjectId;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
