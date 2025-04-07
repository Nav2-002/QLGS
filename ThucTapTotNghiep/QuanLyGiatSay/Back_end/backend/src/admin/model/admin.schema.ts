import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Role } from '../../auth/decorator/role.enum';

export type AdminDocument = Admin & Document;

@Schema({ versionKey: false })
export class Admin {
  
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Role, default: Role.ADMIN })
  role: Role;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Store' })
  id_store: Types.ObjectId;

  @Prop({ default: true })
  status: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
