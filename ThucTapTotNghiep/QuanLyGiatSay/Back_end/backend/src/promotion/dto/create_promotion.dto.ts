// src/promotion/dto/create_promotion.dto.ts
import { IsNotEmpty, IsNumber, IsDateString, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  ten_khuyenmai: string;

  @IsString()
  @IsOptional()
  mo_ta: string;

  @IsEnum(['Phần trăm', 'Tiền mặt'])
  loai_khuyenmai: string;

  @IsNumber()
  gia_tri: number;

  @IsDateString()
  ngay_bat_dau: string;

  @IsDateString()
  ngay_ket_thuc: string;

  @IsBoolean()
  trangthai: boolean;
}