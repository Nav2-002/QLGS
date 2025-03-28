import { IsNotEmpty, IsOptional, IsString, IsMongoId, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsMongoId()
  id_laundry_order: string; // Liên kết đơn hàng giặt

  @IsNotEmpty()
  @IsMongoId()
  id_store: string; // Chi nhánh

  @IsNotEmpty()
  @IsString()
  date: string; // Ngày xuất hóa đơn (ISO string)

  @IsNotEmpty()
  @IsNumber()
  total_price: number; // Tổng tiền

  @IsOptional()
  @IsNumber()
  discount_price?: number; // Tiền khuyến mãi

  @IsNotEmpty()
  @IsNumber()
  actual_price: number; // Tiền thực thu

  @IsOptional()
  @IsNumber()
  shipping_fee?: number; // Phí ship

  @IsNotEmpty()
  @IsString()
  status: string; // Trạng thái ('Chưa thanh toán', 'Đã thanh toán')

  @IsOptional()
  @IsString()
  note?: string; // Ghi chú
}
