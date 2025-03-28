import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import e from 'express';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Invoice extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'LaundryOrder' }) 
  id_laundry_order: Types.ObjectId; // Liên kết đơn hàng giặt

  @Prop({ type: Types.ObjectId, required: true, ref: 'Store' }) 
  id_store: Types.ObjectId; // Chi nhánh

  @Prop({ type: Date, required: true }) 
  date: Date; // Ngày xuất hóa đơn

  @Prop({ type: Number, required: true }) 
  total_price: number; // Tổng tiền

  @Prop({ type: Number, default: 0 }) 
  discount_price: number; // Tiền khuyến mãi

  @Prop({ type: Number, required: true }) 
  actual_price: number; // Tiền thực thu

  @Prop({ type: Number, default: 0 }) 
  shipping_fee: number; // Phí ship

  @Prop({ type: String, required: true }) 
  status: string; // Trạng thái ('Chưa thanh toán', 'Đã thanh toán')

  @Prop({ type: String, default: '' }) 
  note: string; // Ghi chú
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
export default InvoiceSchema;
export type InvoiceDocument = Invoice & Document;