import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDate, IsBoolean, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer'; // Thêm import cho Type

export class CreateGoodsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date) 
  expiryDate?: Date;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsMongoId()
  id_store?: string;
}