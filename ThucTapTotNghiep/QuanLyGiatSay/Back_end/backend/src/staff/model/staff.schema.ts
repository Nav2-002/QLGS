import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type StaffDocument = Staff & Document;

@Schema({ timestamps: true })
export class Staff {

  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  id_cuahang: Types.ObjectId;

  @Prop({ required: true })
  ten: string;

  @Prop()
  sodienthoai: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  vaitro: string; // 'Nhân viên', 'Quản lý', 'Giao hàng'

  @Prop({ required: true })
  matkhau: string;


}
  export const StaffSchema = SchemaFactory.createForClass(Staff);