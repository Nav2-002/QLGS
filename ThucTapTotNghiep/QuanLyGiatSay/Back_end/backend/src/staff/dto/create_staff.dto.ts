import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateStaffDto {
  @IsMongoId()
  @IsNotEmpty()
  id_store: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;


  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  role?: string = 'staff';

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsNotEmpty()
  @IsString()
  status: boolean;
}
