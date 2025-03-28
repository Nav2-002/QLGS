import { IsNotEmpty, IsOptional, IsString, IsMongoId, IsNumber } from 'class-validator';

export class CreateStockTransactionDto {
  @IsNotEmpty()
  @IsMongoId()
  id_goods: string;

  @IsNotEmpty()
  @IsMongoId()
  id_store: string;

  @IsOptional()
  @IsMongoId()
  id_supplier?: string;

  @IsNotEmpty()
  @IsString()
  type: string; // 'Nhap' hoặc 'Xuat'

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  date: Date;
}
