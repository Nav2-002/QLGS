import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type StockTransactionDocument = StockTransaction & Document;

@Schema({ timestamps: true })
export class StockTransaction {
  @Prop({ type: Types.ObjectId, ref: 'Goods', required: true })
  id_goods: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  id_store: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Supplier', required: false })
  id_supplier?: Types.ObjectId;

  @Prop({ required: true, enum: ['Nhap', 'Xuat'] })
  type: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  date: Date;
}

export const StockTransactionSchema = SchemaFactory.createForClass(StockTransaction);
