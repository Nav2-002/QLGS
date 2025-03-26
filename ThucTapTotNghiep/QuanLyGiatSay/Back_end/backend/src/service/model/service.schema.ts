import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
    
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types .ObjectId;

  @Prop({ required: true })
  ten_dichvu: string;

  @Prop({ required: true, type: Number })
  gia: number;

  @Prop()
  mo_ta: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
