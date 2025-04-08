import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';

export type LaundryOrderDocument = LaundryOrder & Document;

@Schema({ versionKey: false, timestamps: { createdAt: 'createdAt', updatedAt: false } }) // Đổi createdAt
export class LaundryOrder {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Store', required: true })
  id_store: Types.ObjectId; // Đổi 'id_cuahang' thành 'id_store'

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Customer', required: true })
  id_customer: Types.ObjectId; // Đổi 'id_khachhang' thành 'id_customer'

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Staff', required: true })
  id_staff: Types.ObjectId; // Đổi 'id_nhanvien' thành 'id_staff'

  @Prop({ type: Date, required: true })
  receivedDate: Date; // Đổi 'ngay_nhan' thành 'receivedDate'

  @Prop({ type: Date, default: null })
  returnedDate: Date; // Đổi 'ngay_tra' thành 'returnedDate'

  @Prop({ type: String })
  pickupAddress: string; // Đổi 'diachi_nhan' thành 'pickupAddress'

  @Prop({ type: String })
  deliveryAddress: string; // Đổi 'diachi_giao' thành 'deliveryAddress'

  @Prop({ type: Number, required: true })
  totalAmount: number; // Đổi 'tong_tien' thành 'totalAmount'

  @Prop({ type: Number, default: 0 })
  discountAmount: number; // Đổi 'tien_khuyenmai' thành 'discountAmount'

  @Prop({ type: Number, required: true })
  amountPaid: number; // Đổi 'tien_thu' thành 'amountPaid'

  @Prop({ type: String, required: true })
  status: string; // Giữ nguyên 'trangthai' vì 'status' đã phù hợp

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Promotion', default: null })
  id_promiton: Types.ObjectId; // Đổi 'id_khuyenmai' thành 'id_promotion'

  // createdAt sẽ được quản lý bởi timestamps

  @Prop({
    type: [
      {
        id_service: { type: SchemaTypes.ObjectId, ref: 'Service', required: true }, // Đổi 'id_dichvu' thành 'id_service'
        quantity: { type: Number, required: true }, // Giữ nguyên 'soluong'
        price: { type: Number, required: true }, // Giữ nguyên 'gia'
        subTotal: { type: Number, required: true }, // Đổi 'thanhtien' thành 'subTotal'
        note: { type: String, default: '' } // Đổi 'ghichu' thành 'note'
      }
    ],
    default: []
  })
  orderDetails: { // Đổi 'details' thành 'orderDetails'
    id_service: Types.ObjectId; // Đổi 'id_service'
    quantity: number; // Giữ nguyên
    price: number; // Giữ nguyên
    subTotal: number; // Đổi 'thanhtien'
    note?: string; // Đổi 'ghichu'
  }[];
}

export const LaundryOrderSchema = SchemaFactory.createForClass(LaundryOrder);