import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDetailDto {
  @IsNotEmpty()
  @IsString()
  id_invoice: string;

  @IsOptional()
  @IsString()
  id_service?: string;

  @IsOptional()
  @IsString()
  id_goods?: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  note?: string;
}
