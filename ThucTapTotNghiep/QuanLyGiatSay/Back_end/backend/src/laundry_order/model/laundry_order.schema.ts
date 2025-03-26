import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';

export type LaundryOrderDocument = LaundryOrder & Document;

@Schema({ versionKey: false })
export class LaundryOrder {


  @Prop({ type: SchemaTypes.ObjectId, ref: 'CuaHang', required: true })
  id_cuahang: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'KhachHang', required: true })
  id_khachhang: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'NhanVien', required: true })
  id_nhanvien: Types.ObjectId;

  @Prop({ type: Date, required: true })
  ngay_nhan: Date;

  @Prop({ type: Date, default: null })
  ngay_tra: Date;

  @Prop({ type: String })
  diachi_nhan: string;

  @Prop({ type: String })
  diachi_giao: string;

  @Prop({ type: Number, required: true })
  tong_tien: number;

  @Prop({ type: Number, default: 0 })
  tien_khuyenmai: number;

  @Prop({ type: Number, required: true })
  tien_thu: number;

  @Prop({ type: String, required: true })
  trangthai: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'KhuyenMai', default: null })
  id_khuyenmai: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  created_at?: Date;

  @Prop({
    type: [
      {
        id_dichvu: { type: SchemaTypes.ObjectId, ref: 'Service', required: true },
        soluong: { type: Number, required: true },
        gia: { type: Number, required: true },
        thanhtien: { type: Number, required: true },
        ghichu: { type: String, default: '' }
      }
    ],
    default: []
  })
  details: {
    id_dichvu: Types.ObjectId;
    soluong: number;
    gia: number;
    thanhtien: number;
    ghichu?: string;
  }[];
}

export const LaundryOrderSchema = SchemaFactory.createForClass(LaundryOrder);
