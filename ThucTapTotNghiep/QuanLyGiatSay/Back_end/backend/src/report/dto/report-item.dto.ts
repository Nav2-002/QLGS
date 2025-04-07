import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class ReportItemDto {
  @Prop({ type: Types.ObjectId, ref: 'Store' })
  store_id: Types.ObjectId;
  gross_sales: number; //Tong doanh thu
  orders_count: number; //Tong so don hang
  date: Date;
}
