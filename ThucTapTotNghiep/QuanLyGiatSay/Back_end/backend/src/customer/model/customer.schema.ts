import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true }) // tự động thêm createdAt & updatedAt
export class Customer {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ unique: true })
  email?: string;

  @Prop()
  address?: string;

  @Prop()
  birth_date?: Date;

  @Prop({ required: true })
  password: string;
  
  @Prop()
  customer_type?: string;

  @Prop({ default: 'customer' })
  role: string;

  @Prop({ default: true })
  status: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
