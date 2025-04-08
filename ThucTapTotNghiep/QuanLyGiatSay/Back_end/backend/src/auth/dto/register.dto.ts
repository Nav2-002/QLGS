import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MinLength,
    IsOptional,
    IsDateString,
    IsEnum,
    IsMongoId,
  } from 'class-validator';
  import { Role } from '../decorator/role.enum';
  
  export class RegisterCustomerDto {
    @IsNotEmpty() // Loại bỏ readonly để có thể gán giá trị
    @IsString()
    name: string;
  
    @IsNotEmpty() // Loại bỏ readonly
    @IsString()
    phoneNumber: string;
  
    @IsNotEmpty() // Loại bỏ readonly
    @IsEmail()
    email: string;
  
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    password: string;

    @IsOptional() // Giữ IsOptional nếu trường có thể không có giá trị
    @IsString()
    address: string;
  
    @IsOptional() // Giữ IsOptional
    @IsDateString()
    birth_date?: Date;
  
    @IsNotEmpty() // Loại bỏ readonly
    @IsString()
    customer_type: string;
  
    @IsNotEmpty() // Loại bỏ readonly
    @IsEnum(Role)
    role: Role;
  }
  export class RegisterStaffDto {
    @IsMongoId()
    @IsNotEmpty()
    id_store: string;
  
    @IsNotEmpty() // Loại bỏ readonly
    @IsString()
    name: string;
  
    @IsOptional() // Giữ IsOptional
    @IsString()
    phoneNumber: string;
  
    @IsNotEmpty() // Loại bỏ readonly
    @IsEmail()
    email: string;
  
    @IsNotEmpty() // Loại bỏ readonly
    @IsEnum(Role)
    role: Role.STAFF;
  
    @IsNotEmpty({ message: 'Password is required' }) // Loại bỏ readonly
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
  
    @IsNotEmpty() // Loại bỏ readonly
    @IsString()
    status: boolean;
  }