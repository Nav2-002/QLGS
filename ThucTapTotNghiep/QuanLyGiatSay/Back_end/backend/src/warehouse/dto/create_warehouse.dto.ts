import { IsNotEmpty, IsOptional, IsBoolean, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateWarehouseDto {
  @IsNotEmpty()
  @IsMongoId()
  id_store: string;

  @IsNotEmpty()
  @IsMongoId()
  id_goods: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}