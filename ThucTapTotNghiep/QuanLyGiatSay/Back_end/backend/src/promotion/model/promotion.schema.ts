import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type PromotionDocument = Promotion & Document;

@Schema({ timestamps: true })
export class Promotion {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  
  @Prop({ required: true })
  ten_khuyenmai: string;

  @Prop()
  mo_ta: string;

  @Prop({ required: true })
  loai_khuyenmai: string; // 'Phần trăm' hoặc 'Tiền mặt'

  @Prop({ required: true, type: Number })
  gia_tri: number;

  @Prop({ required: true })
  ngay_bat_dau: Date;

  @Prop({ required: true })
  ngay_ket_thuc: Date;

  @Prop({ required: true, type: Boolean })
  trangthai: boolean;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
