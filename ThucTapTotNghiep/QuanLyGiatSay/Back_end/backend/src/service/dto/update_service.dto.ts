import { IsOptional, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number; 

  @IsOptional()
  @IsString()
  description?: string; 
}