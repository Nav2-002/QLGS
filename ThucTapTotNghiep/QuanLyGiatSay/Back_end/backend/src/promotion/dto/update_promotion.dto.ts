import { IsNotEmpty, IsEnum, IsNumber, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePromotionDto {
  @IsNotEmpty()
  @IsOptional()
  ten_khuyenmai: string;

  @IsOptional()
  mo_ta?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(['Phần trăm', 'Tiền mặt'])
  loai_khuyenmai: string;

  @IsNumber()
  @IsOptional()
  gia_tri: number;

  @IsDateString()
  @IsOptional()
  ngay_bat_dau: Date;

  @IsDateString()
  @IsOptional()
  ngay_ket_thuc: Date;

  @IsBoolean()
  @IsOptional()
  trangthai: boolean;
}
