import { IsNotEmpty, IsOptional, IsMongoId, IsDateString, IsNumber, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class OrderDetailDto {
  @IsMongoId()
  id_dichvu: string;

  @IsMongoId()
  @IsOptional()
  id_hanghoa?: string;

  @IsNumber()
  soluong: number;

  @IsNumber()
  gia: number;

  @IsNumber()
  thanhtien: number;

  @IsString()
  @IsOptional()
  ghichu?: string;
}

export class CreateLaundryOrderDto {
  @IsMongoId()
  id_cuahang: string;

  @IsMongoId()
  id_khachhang: string;

  @IsMongoId()
  id_nhanvien: string;

  @IsDateString()
  ngay_nhan: string;

  @IsOptional()
  @IsDateString()
  ngay_tra?: string;

  @IsOptional()
  @IsString()
  diachi_nhan?: string;

  @IsOptional()
  @IsString()
  diachi_giao?: string;

  @IsNumber()
  tong_tien: number;

  @IsOptional()
  @IsNumber()
  tien_khuyenmai?: number;

  @IsNumber()
  tien_thu: number;

  @IsString()
  trangthai: string;

  @IsOptional()
  @IsMongoId()
  id_khuyenmai?: string;

  @IsArray()
  @Type(() => OrderDetailDto)
  details: OrderDetailDto[];
}
