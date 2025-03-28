import { IsOptional, IsString, IsMongoId, IsNumber } from 'class-validator';

export class UpdateStockTransactionDto {
  @IsOptional()
  @IsMongoId()
  id_goods?: string;

  @IsOptional()
  @IsMongoId()
  id_store?: string;

  @IsOptional()
  @IsMongoId()
  id_supplier?: string;

  @IsOptional()
  @IsString()
  type?: string; // 'Nhap' hoặc 'Xuat'

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  date?: Date;
}
