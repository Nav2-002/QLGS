import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type DeliveryDocument = Delivery & Document;

@Schema({ timestamps: true })
export class Delivery {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'LaundryOrder', required: true })
  id_laundry_order: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Staff', required: true })
  id_delivery_staff: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  id_store: Types.ObjectId;

  @Prop({ required: true })
  delivery_address: string;

  @Prop()
  phone_number: string;

  @Prop()
  email: string;

  @Prop({ required: true, enum: ['Pending', 'In Delivery', 'Delivered'] })
  status: string;

  @Prop({ required: true })
  password: string;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
