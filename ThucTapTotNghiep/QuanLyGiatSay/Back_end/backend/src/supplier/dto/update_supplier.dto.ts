import { IsOptional, IsString, IsMongoId } from 'class-validator';

export class UpdateSupplierDto {
  @IsOptional()
  @IsMongoId()
  id_store?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
