import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Types } from 'mongoose';

export type MembershipCardDocument = HydratedDocument<MembershipCard>;

@Schema()
export class MembershipCard {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Customer', required: false })
  id_customer: Types.ObjectId;

  @Prop({ required: true })
  card_number: string;

  @Prop({ required: true })
  issue_date: Date;

  @Prop({ required: true })
  expiry_date: Date;

  @Prop({ default: 0 })
  points: number;

  @Prop({ required: true })
  status: boolean;
}

export const MembershipCardSchema = SchemaFactory.createForClass(MembershipCard);
