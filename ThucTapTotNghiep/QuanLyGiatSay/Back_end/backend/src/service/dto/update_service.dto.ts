import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsNotEmpty()
  ten_dichvu?: string;

  @IsOptional()
  @IsNumber()
  gia?: number;

  @IsOptional()
  mo_ta?: string;
}
