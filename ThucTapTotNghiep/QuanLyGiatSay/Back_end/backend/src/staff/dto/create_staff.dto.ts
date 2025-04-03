import { IsNotEmpty, IsString, IsOptional, IsMongoId } from 'class-validator';

export class CreateStaffDto {
  @IsMongoId()
  @IsNotEmpty()
  id_store: string;

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

  @IsOptional()
  @IsString()
  role?: string;
}
