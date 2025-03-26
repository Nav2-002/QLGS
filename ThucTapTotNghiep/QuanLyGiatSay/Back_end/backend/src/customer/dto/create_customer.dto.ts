import { IsString, IsEmail, IsDateString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  readonly ten: string;

  @IsString()
  readonly sodienthoai: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly diachi: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  mat_khau: string;


  @IsDateString()
  readonly ngay_sinh: Date;

  @IsString()
  readonly loai_khach: string;

  @IsString()
  readonly vaitro: string;
}
