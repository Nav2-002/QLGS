import { IsNotEmpty, IsNumber, IsDateString, IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  name: string; // Đổi 'ten_khuyenmai' thành 'name'

  @IsString()
  @IsOptional()
  description: string; // Đổi 'mo_ta' thành 'description'

  @IsEnum(['Percentage', 'Cash']) // Đổi enum values sang tiếng Anh
  type: string; // Đổi 'loai_khuyenmai' thành 'type'

  @IsNumber()
  value: number; // Đổi 'gia_tri' thành 'value'

  @IsDateString()
  startDate: string; // Đổi 'ngay_bat_dau' thành 'startDate'

  @IsDateString()
  endDate: string; // Đổi 'ngay_ket_thuc' thành 'endDate'

  @IsBoolean()
  status: boolean; // Giữ nguyên 'trangthai' thành 'status'
}
