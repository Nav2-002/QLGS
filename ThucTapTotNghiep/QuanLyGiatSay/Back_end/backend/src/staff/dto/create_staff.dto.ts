import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  id_cuahang: string;

  @IsNotEmpty()
  @IsString()
  ten: string;

  @IsOptional()
  @IsString()
  sodienthoai?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsString()
  vaitro: string;

  @IsNotEmpty()
  @IsString()
  matkhau: string;
}
