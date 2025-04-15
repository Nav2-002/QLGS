import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Role } from 'src/auth/decorator/role.enum';

export type StaffDocument = Staff & Document;

@Schema({ timestamps: true })
export class Staff {

  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  id_store: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;

  @Prop({ type: String, enum: Role, default: Role.STAFF })
  role: Role[];

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  status: boolean;
  
}
  export const StaffSchema = SchemaFactory.createForClass(Staff);