import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {

  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string; // Đổi 'ten_dichvu' thành 'name'

  @Prop({ required: true, type: Number })
  price: number; // Đổi 'gia' thành 'price'

  @Prop()
  description: string; // Đổi 'mo_ta' thành 'description'
}

export const ServiceSchema = SchemaFactory.createForClass(Service);