import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Types } from 'mongoose';

export type MembershipCardDocument = HydratedDocument<MembershipCard>;

@Schema()
export class MembershipCard {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  id_khachhang: Types.ObjectId;

  @Prop({ required: true })
  so_the: string;

  @Prop({ required: true })
  ngay_cap: Date;

  @Prop({ required: true })
  ngay_het_han: Date;

  @Prop({ default: 0 })
  diem_tich_luy: number;

  @Prop({ required: true })
  trangthai: boolean;
}

export const MembershipCardSchema = SchemaFactory.createForClass(MembershipCard);
