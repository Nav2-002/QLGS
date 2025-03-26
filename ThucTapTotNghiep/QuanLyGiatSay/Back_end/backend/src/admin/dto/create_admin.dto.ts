import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsOptional()
  id?: string;

  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsOptional()
  role?: string = 'admin';
}
