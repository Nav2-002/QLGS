import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDate, IsBoolean, IsMongoId } from 'class-validator';

export class CreateGoodsDto {
  @IsNotEmpty()
  @IsString()
  ten_hanghoa: string;

  @IsNotEmpty()
  @IsString()
  loai: string;

  @IsNotEmpty()
  @IsNumber()
  soluong: number;

  @IsNotEmpty()
  @IsNumber()
  gia: number;

  @IsOptional()
  @IsDate()
  han_su_dung?: Date;

  @IsNotEmpty()
  @IsString()
  donvi: string;

  @IsNotEmpty()
  @IsBoolean()
  trangthai: boolean;

  @IsOptional()
  @IsMongoId()
  id_cuahang?: string; // Liên kết đến cửa hàng
}
