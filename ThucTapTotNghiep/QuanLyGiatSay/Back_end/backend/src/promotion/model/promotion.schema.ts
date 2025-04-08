import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type PromotionDocument = Promotion & Document;

@Schema({ timestamps: true })
export class Promotion {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string; // Đổi 'ten_khuyenmai' thành 'name'

  @Prop({ required: true })
  description: string; // Đổi 'mo_ta' thành 'description'

  @Prop({ required: true })
  type: string; // Đổi 'loai_khuyenmai' thành 'type' ('Percentage' or 'Cash')

  @Prop({ required: true, type: Number })
  value: number; // Đổi 'gia_tri' thành 'value'

  @Prop({ required: true })
  startDate: Date; // Đổi 'ngay_bat_dau' thành 'startDate'

  @Prop({ required: true })
  endDate: Date; // Đổi 'ngay_ket_thuc' thành 'endDate'

  @Prop({ required: true, type: Boolean })
  status: boolean; // Giữ nguyên 'trangthai' vì 'status' đã phù hợp
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);