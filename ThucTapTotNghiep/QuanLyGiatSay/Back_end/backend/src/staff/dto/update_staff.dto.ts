import { IsNotEmpty, IsString, IsOptional, IsMongoId, IsEmail } from 'class-validator';

export class UpdateStaffDto {
  @IsMongoId()
  @IsNotEmpty()
  id_store: string;

  @IsOptional()
  @IsString()
  name?: string; 

  @IsOptional()
  @IsString()
  phoneNumber?: string; 

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;


  @IsOptional()
  @IsString()
  password?: string; 

  @IsNotEmpty()
  @IsString()
  status?: boolean;
}