import { IsOptional, IsString, IsEmail, IsDateString, MinLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password?: string;

  @IsOptional()
  @IsDateString()
  readonly birth_day?: Date;

  @IsOptional()
  @IsString()
  readonly customer_type?: string;

  @IsOptional()
  @IsString()
  readonly role?: string;
}
