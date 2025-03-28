import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class InvoiceDetail extends Document {
  @Prop({ required: true, type: String, ref: 'Invoice' })
  id_invoice: string;

  @Prop({ type: String, ref: 'Service', default: null })
  id_service?: string;

  @Prop({ type: String, ref: 'Goods', default: null })
  id_goods?: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ default: '' })
  note?: string;

  get total_price() {
    return this.quantity * this.price;
  }
}

export const InvoiceDetailSchema = SchemaFactory.createForClass(InvoiceDetail);
export default InvoiceDetailSchema;
export type InvoiceDetailDocument = InvoiceDetail & Document;