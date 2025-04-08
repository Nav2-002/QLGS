import { IsNotEmpty, IsOptional, IsMongoId, IsDateString, IsNumber, IsString } from 'class-validator';

export class UpdateLaundryOrderDto {
  @IsMongoId()
  @IsOptional()
  id_store?: string; // Đổi 'id_cuahang' thành 'id_store'

  @IsMongoId()
  @IsOptional()
  id_customer?: string; // Đổi 'id_khachhang' thành 'id_customer'

  @IsMongoId()
  @IsOptional()
  id_staff?: string; // Đổi 'id_nhanvien' thành 'id_staff'

  @IsDateString()
  @IsOptional()
  receivedDate?: string; // Đổi 'ngay_nhan' thành 'receivedDate'

  @IsOptional()
  @IsDateString()
  returnedDate?: string; // Đổi 'ngay_tra' thành 'returnedDate'

  @IsOptional()
  @IsString()
  pickupAddress?: string; // Đổi 'diachi_nhan' thành 'pickupAddress'

  @IsOptional()
  @IsString()
  deliveryAddress?: string; // Đổi 'diachi_giao' thành 'deliveryAddress'

  @IsNumber()
  @IsOptional()
  totalAmount?: number; // Đổi 'tong_tien' thành 'totalAmount'

  @IsOptional()
  @IsNumber()
  discountAmount?: number; // Đổi 'tien_khuyenmai' thành 'discountAmount'

  @IsNumber()
  @IsOptional()
  amountPaid?: number; // Đổi 'tien_thu' thành 'amountPaid'

  @IsOptional()
  @IsString()
  status?: string; // Giữ nguyên 'trangthai'

  @IsOptional()
  @IsMongoId()
  promotionId?: string; // Đổi 'id_khuyenmai' thành 'promotionId'
}