import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDate, IsBoolean, IsMongoId } from 'class-validator';

export class UpdateGoodsDto {
  @IsOptional()
  @IsString()
  ten_hanghoa?: string;

  @IsOptional()
  @IsString()
  loai?: string;

  @IsOptional()
  @IsNumber()
  soluong?: number;

  @IsOptional()
  @IsNumber()
  gia?: number;

  @IsOptional()
  @IsDate()
  han_su_dung?: Date;

  @IsOptional()
  @IsString()
  donvi?: string;

  @IsOptional()
  @IsBoolean()
  trangthai?: boolean;

  @IsOptional()
  @IsMongoId()
  id_cuahang?: string; // Liên kết đến cửa hàng
}
