import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password?: string;

  @IsOptional()
  role?: string;

  @IsOptional()
  id_store?: string;
}
