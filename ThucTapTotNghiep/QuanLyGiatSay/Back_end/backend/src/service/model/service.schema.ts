import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {

  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop()
  description: string;

  @Prop()
  image: string;

  // ✅ Các field mới được thêm vào đây:
  @Prop()
  type: string;

  @Prop()
  duration: string;

  @Prop()
  note: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
