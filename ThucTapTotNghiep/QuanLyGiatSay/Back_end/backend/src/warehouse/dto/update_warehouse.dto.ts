import { IsOptional, IsString, IsBoolean, IsMongoId, IsNumber } from 'class-validator';

export class UpdateWarehouseDto {
  @IsOptional()
  @IsMongoId()
  id_store?: string;

  @IsOptional()
  @IsMongoId()
  id_goods?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
