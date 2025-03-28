import { IsOptional, IsString, IsMongoId, IsNumber } from 'class-validator';

export class UpdateInvoiceDto {
  @IsOptional()
  @IsMongoId()
  id_laundry_order?: string; // Liên kết đơn hàng giặt

  @IsOptional()
  @IsMongoId()
  id_store?: string; // Chi nhánh

  @IsOptional()
  @IsString()
  date?: string; // Ngày xuất hóa đơn (ISO string)

  @IsOptional()
  @IsNumber()
  total_price?: number; // Tổng tiền

  @IsOptional()
  @IsNumber()
  discount_price?: number; // Tiền khuyến mãi

  @IsOptional()
  @IsNumber()
  actual_price?: number; // Tiền thực thu

  @IsOptional()
  @IsNumber()
  shipping_fee?: number; // Phí ship

  @IsOptional()
  @IsString()
  status?: string; // Trạng thái ('Chưa thanh toán', 'Đã thanh toán')

  @IsOptional()
  @IsString()
  note?: string; // Ghi chú
}
