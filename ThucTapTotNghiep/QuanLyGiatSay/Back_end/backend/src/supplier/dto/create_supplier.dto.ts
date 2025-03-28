import { IsNotEmpty, IsOptional, IsString, IsMongoId } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsMongoId()
  id_store: string;

  @IsNotEmpty()
  @IsString()
  ten: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
