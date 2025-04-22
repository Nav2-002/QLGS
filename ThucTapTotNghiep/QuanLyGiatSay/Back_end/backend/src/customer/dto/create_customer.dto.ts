import { IsString, IsEmail, IsDateString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly address: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  readonly password: string;


  @IsDateString()
  readonly birth_day?: Date;

  @IsString()
  readonly customer_type:  string;

  @IsString()
  readonly role: string;
}
