import { IsNotEmpty, IsEnum, IsNumber, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  ten_khuyenmai: string;

  @IsOptional()
  mo_ta?: string;

  @IsNotEmpty()
  @IsEnum(['Phần trăm', 'Tiền mặt'])
  loai_khuyenmai: string;

  @IsNumber()
  gia_tri: number;

  @IsDateString()
  ngay_bat_dau: Date;

  @IsDateString()
  ngay_ket_thuc: Date;

  @IsBoolean()
  trangthai: boolean;
}
