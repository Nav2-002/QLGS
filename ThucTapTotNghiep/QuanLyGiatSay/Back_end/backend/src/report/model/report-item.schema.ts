import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Store } from 'src/store/model/store.schema';

@Schema({ timestamps: true })
export class ReportItem extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  store_id: Types.ObjectId;

  @Prop({ required: true })
  gross_sales: number; // Tong doanh thu

  @Prop({ required: true })
  net_sales: number; // Loi nhuan

  @Prop({ required: true })
  orders_count: number; // Tong so don hang

  @Prop({ required: true })
  date: Date;
}

export const ReportItemSchema = SchemaFactory.createForClass(ReportItem);
