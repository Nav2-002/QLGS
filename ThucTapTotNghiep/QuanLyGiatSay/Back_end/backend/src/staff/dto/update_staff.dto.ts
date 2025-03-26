import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateStaffDto {
  @IsOptional()
  id_cuahang?: string;

  @IsOptional()
  @IsString()
  ten?: string;

  @IsOptional()
  @IsString()
  sodienthoai?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  vaitro?: string;

  @IsOptional()
  @IsString()
  matkhau?: string;

  @IsOptional()
  @IsString()
  role?: string;
} 
