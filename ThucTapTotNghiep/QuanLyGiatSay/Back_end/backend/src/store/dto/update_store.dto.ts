import { IsOptional, IsString, IsBoolean, IsMongoId } from 'class-validator';

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  ten_cuahang?: string;

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
