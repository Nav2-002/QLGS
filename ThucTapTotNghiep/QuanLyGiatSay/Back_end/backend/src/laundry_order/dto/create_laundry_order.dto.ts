import { IsNotEmpty, IsOptional, IsMongoId, IsDateString, IsNumber, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class OrderDetailDto {
  @IsMongoId()
  id_service: string; // Đổi 'id_dichvu' thành 'id_service'

  @IsMongoId()
  @IsOptional()
  id_goods?: string; // Đổi 'id_hanghoa' thành 'id_goods'

  @IsNumber()
  quantity: number; // Giữ nguyên 'soluong'

  @IsNumber()
  price: number; // Giữ nguyên 'gia'

  @IsNumber()
  subTotal: number; // Đổi 'thanhtien' thành 'subTotal'

  @IsString()
  @IsOptional()
  note?: string; // Đổi 'ghichu' thành 'note'
}

export class CreateLaundryOrderDto {
  @IsMongoId()
  id_store: string; // Đổi 'id_cuahang' thành 'id_store'

  @IsMongoId()
  id_customer: string; // Đổi 'id_khachhang' thành 'id_customer'

  @IsMongoId()
  id_staff: string; // Đổi 'id_nhanvien' thành 'id_staff'

  @IsDateString()
  receivedDate: string; // Đổi 'ngay_nhan' thành 'receivedDate'

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
  totalAmount: number; // Đổi 'tong_tien' thành 'totalAmount'

  @IsOptional()
  @IsNumber()
  discountAmount?: number; // Đổi 'tien_khuyenmai' thành 'discountAmount'

  @IsNumber()
  amountPaid: number; // Đổi 'tien_thu' thành 'amountPaid'

  @IsString()
  status: string; // Giữ nguyên 'trangthai'

  @IsOptional()
  @IsMongoId()
  promotionId?: string; // Đổi 'id_khuyenmai' thành 'promotionId'

  @IsArray()
  @Type(() => OrderDetailDto)
  orderDetails: OrderDetailDto[]; // Đổi 'details' thành 'orderDetails'
}