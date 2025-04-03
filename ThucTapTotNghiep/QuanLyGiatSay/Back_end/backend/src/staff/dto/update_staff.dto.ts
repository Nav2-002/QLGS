import { IsNotEmpty, IsString, IsOptional, IsMongoId } from 'class-validator';

export class UpdateStaffDto {
  @IsMongoId()
  @IsNotEmpty()
  id_store: string;

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
