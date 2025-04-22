  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
  import { Document, SchemaTypes, Types } from 'mongoose';
  import { Role } from 'src/auth/decorator/role.enum';

  export type CustomerDocument = Customer & Document;

  @Schema({ timestamps: true }) // tự động thêm createdAt & updatedAt
  export class Customer {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ unique: true })
    email?: string;

    @Prop()
    address?: string;

    @Prop()
    birth_day?: Date;

    @Prop({ required: true })
    password: string;
    
    @Prop()
    customer_type?: string;

    @Prop({ type: String, enum: Role, default: Role.CUSTOMER })
    role: Role;

    @Prop({ default: true })
    status: boolean;
  }

  export const CustomerSchema = SchemaFactory.createForClass(Customer);
