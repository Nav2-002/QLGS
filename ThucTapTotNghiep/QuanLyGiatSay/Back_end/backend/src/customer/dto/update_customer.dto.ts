import { IsOptional, IsString, IsEmail, IsDateString, MinLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  readonly ten?: string;

  @IsOptional()
  @IsString()
  readonly sodienthoai?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly diachi?: string;

  @IsOptional()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  mat_khau?: string;

  @IsOptional()
  @IsDateString()
  readonly ngay_sinh?: Date;

  @IsOptional()
  @IsString()
  readonly loai_khach?: string;

  @IsOptional()
  @IsString()
  readonly vaitro?: string;
}
