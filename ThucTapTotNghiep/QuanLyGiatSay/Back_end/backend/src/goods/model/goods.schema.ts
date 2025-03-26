import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type GoodsDocument = Goods & Document;

@Schema({ timestamps: true })
export class Goods {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  ten_hanghoa: string;

  @Prop({ required: true })
  loai: string;

  @Prop({ required: true })
  soluong: number;

  @Prop({ required: true })
  gia: number;

  @Prop()
  han_su_dung?: Date;

  @Prop({ required: true })
  donvi: string;

  @Prop({ required: true, default: true })
  trangthai: boolean;

  // Liên kết đến cửa hàng (id của STORE)
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Store', required: false })
  id_cuahang: Types.ObjectId;
}

export const GoodsSchema = SchemaFactory.createForClass(Goods);
