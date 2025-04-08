import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({ timestamps: true })
export class Supplier {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  id_store: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);
