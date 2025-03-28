import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ShelfDocument = Shelf & Document;

@Schema({ timestamps: true })
export class Shelf {
  @Prop({ type: Types.ObjectId, ref: 'LaundryOrder', required: true })
  id_laundry_order: Types.ObjectId;

  @Prop({ type: String, required: true })
  location: string; // Vị trí cụ thể

  @Prop({ type: String })
  stage?: string; // Giai đoạn (nếu có)

  @Prop({ type: String })
  note?: string; // Ghi chú
}

export const ShelfSchema = SchemaFactory.createForClass(Shelf);
