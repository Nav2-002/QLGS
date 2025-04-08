import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type GoodsDocument = Goods & Document;

@Schema({ timestamps: true })
export class Goods {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string; // Đổi 'ten_hanghoa' thành 'name'

  @Prop({ required: true })
  category: string; // Đổi 'loai' thành 'category'

  @Prop({ required: true })
  quantity: number; // Đổi 'soluong' thành 'quantity'

  @Prop({ required: true })
  price: number; // Đổi 'gia' thành 'price'

  @Prop()
  expiryDate?: Date; // Đổi 'han_su_dung' thành 'expiryDate'

  @Prop({ required: true })
  unit: string; // Đổi 'donvi' thành 'unit'

  @Prop({ required: true, default: true })
  status: boolean; // Giữ nguyên 'trangthai' vì 'status' đã phù hợp

  // Liên kết đến cửa hàng (id của STORE)
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Store', required: false })
  id_store?: Types.ObjectId; // Đổi 'id_cuahang' thành 'storeId'
}

export const GoodsSchema = SchemaFactory.createForClass(Goods);