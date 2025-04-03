import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateDeliveryDto {
  @IsOptional()
  @IsMongoId()
  id_laundry_order?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  id_delivery_staff?: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  id_store?: Types.ObjectId;

  @IsOptional()
  @IsString()
  delivery_address?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  status?: string;


}
