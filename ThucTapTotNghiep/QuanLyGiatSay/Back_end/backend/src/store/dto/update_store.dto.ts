import { IsOptional, IsString, IsBoolean, IsMongoId } from 'class-validator';

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  name?: string; // Đổi 'ten_cuahang' thành 'name'

  @IsOptional()
  @IsString()
  phoneNumber?: string; // Đổi 'sodienthoai' thành 'phoneNumber'

  @IsOptional()
  @IsString()
  address?: string; // Đổi 'diachi' thành 'address'

  @IsOptional()
  @IsBoolean()
  status?: boolean; // Giữ nguyên 'trangthai' thành 'status'

  @IsOptional()
  @IsMongoId()
  id_manager?: string; // Đổi 'id_quanly' thành 'managerId'
}