import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';


export type WarehouseDocument = Warehouse & Document;

@Schema({ timestamps: true })
export class Warehouse {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Store', required: true })
  id_store: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Goods', required: true })
  id_goods: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, default: true })
  status: boolean;
}

export const WarehouseSchema = SchemaFactory.createForClass(Warehouse);
