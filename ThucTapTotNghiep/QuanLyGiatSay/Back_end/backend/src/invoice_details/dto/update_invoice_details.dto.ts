import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateInvoiceDetailDto {
  @IsOptional()
  @IsString()
  id_service?: string;

  @IsOptional()
  @IsString()
  id_goods?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  note?: string;
}
