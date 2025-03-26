import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true }) // tự động thêm createdAt & updatedAt
export class Customer {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  ten: string;

  @Prop({ required: true })
  sodienthoai: string;

  @Prop({ unique: true })
  email?: string;

  @Prop()
  diachi?: string;

  @Prop()
  ngay_sinh?: Date;

  @Prop({ required: true })
  mat_khau: string;
  
  @Prop()
  loai_khach?: string;

  @Prop({ default: 'customer' })
  vaitro: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
