import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true })
export class Store {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string; // Đổi 'ten_cuahang' thành 'name'

  @Prop()
  phoneNumber?: string; // Đổi 'sodienthoai' thành 'phoneNumber'

  @Prop()
  address?: string; // Đổi 'diachi' thành 'address'

  @Prop({ required: true, default: true })
  status: boolean; // Giữ nguyên 'trangthai' vì 'status' đã phù hợp

  // Liên kết đến nhân viên quản lý (id của STAFF)
  @Prop({ type: Types.ObjectId, ref: 'Staff', required: false })
  id_manager?: Types.ObjectId; // Đổi 'id_quanly' thành 'managerId'
}

export const StoreSchema = SchemaFactory.createForClass(Store);