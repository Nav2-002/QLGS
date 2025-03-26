import { IsNotEmpty, IsOptional, IsMongoId, IsDateString, IsNumber, IsString } from 'class-validator';

export class UpdateLaundryOrderDto {
  @IsMongoId()
  @IsOptional()
  id_cuahang?: string;

  @IsMongoId()
  @IsOptional()
  id_khachhang?: string;

  @IsMongoId()
  @IsOptional()
  id_nhanvien?: string;

  @IsDateString()
  @IsOptional()
  ngay_nhan?: string;

  @IsOptional()
  @IsDateString()
  ngay_tra?: string;

  @IsOptional()
  @IsString()
  diachi_nhan?: string;

  @IsOptional()
  @IsString()
  diachi_giao?: string;

  @IsNumber()
  @IsOptional()
  tong_tien?: number;

  @IsOptional()
  @IsNumber()
  tien_khuyenmai?: number;

  @IsNumber()
  @IsOptional()
  tien_thu?: number;

  @IsOptional()
  @IsString()
  trangthai?: string;

  @IsOptional()
  @IsMongoId()
  id_khuyenmai?: string;
}
