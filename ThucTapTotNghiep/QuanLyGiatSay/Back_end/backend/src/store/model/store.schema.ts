import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true })
export class Store {

  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  
  @Prop({ required: true })
  ten_cuahang: string;

  @Prop()
  sodienthoai?: string;

  @Prop()
  diachi?: string;

  @Prop({ required: true, default: true })
  trangthai: boolean;

  // Liên kết đến nhân viên quản lý (id của NHANVIEN)
  @Prop({ type: Types.ObjectId, ref: 'Staff', required: false })
  id_quanly?: Types.ObjectId;
}
    
export const StoreSchema = SchemaFactory.createForClass(Store);
