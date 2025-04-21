import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsNumber, IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateMembershipCardDto {
  @IsOptional()
  @IsMongoId()
  readonly id_khachhang?: string;

  @IsOptional()
  readonly so_the?: string;

  @IsOptional()
  @IsDateString()
  readonly ngay_cap?: Date;

  @IsOptional()
  @IsDateString()
  readonly ngay_het_han?: Date;

  @IsOptional()
  @IsNumber()
  readonly diem_tich_luy?: number;

  @IsOptional()
  @IsBoolean()
  readonly trangthai?: boolean;
}
