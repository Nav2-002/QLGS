import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsMongoId } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  ten_cuahang: string;

  @IsOptional()
  @IsString()
  sodienthoai?: string;

  @IsOptional()
  @IsString()
  diachi?: string;

  @IsOptional()
  @IsBoolean()
  trangthai?: boolean;

  @IsOptional()
  @IsMongoId()
  id_quanly?: string; 
}
