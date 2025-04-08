import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDate, IsBoolean, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer'; // Thêm import cho Type

export class UpdateGoodsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date) 
  expiryDate?: Date;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsMongoId()
  id_store?: string;
}