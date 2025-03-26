import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  ten_dichvu: string;

  @IsNumber()
  gia: number;

  @IsOptional()
  mo_ta?: string;
}
