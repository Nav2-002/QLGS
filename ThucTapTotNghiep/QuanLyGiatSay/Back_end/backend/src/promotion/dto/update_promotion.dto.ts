import { IsNotEmpty, IsEnum, IsNumber, IsDateString, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePromotionDto {
  @IsNotEmpty()
  @IsOptional()
  name?: string; // Đổi 'ten_khuyenmai' thành 'name'

  @IsOptional()
  description?: string; // Đổi 'mo_ta' thành 'description'

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(['Percentage', 'Cash']) // Đổi enum values sang tiếng Anh
  type?: string; // Đổi 'loai_khuyenmai' thành 'type'

  @IsNumber()
  @IsOptional()
  value?: number; // Đổi 'gia_tri' thành 'value'

  @IsDateString()
  @IsOptional()
  startDate?: Date; // Đổi 'ngay_bat_dau' thành 'startDate'

  @IsDateString()
  @IsOptional()
  endDate?: Date; // Đổi 'ngay_ket_thuc' thành 'endDate'

  @IsBoolean()
  @IsOptional()
  status?: boolean; // Giữ nguyên 'trangthai' thành 'status'
}