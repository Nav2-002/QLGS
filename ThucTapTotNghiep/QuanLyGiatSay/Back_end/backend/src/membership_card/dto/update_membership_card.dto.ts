import { Transform } from 'class-transformer';
import { IsDateString, IsOptional, IsNumber, IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateMembershipCardDto {
  @IsOptional()
  @IsMongoId()
  readonly id_customer?: string;

  @IsOptional()
  readonly card_number?: string; // Đã sửa

  @IsOptional()
  @IsDateString()
  readonly issue_date?: Date; // Đã sửa

  @IsOptional()
  @IsDateString()
  readonly expiry_date?: Date; // Đã sửa

  @IsOptional()
  @IsNumber()
  readonly points?: number; // Đã sửa

  @IsOptional()
  @IsBoolean()
  readonly status?: boolean; // Đã sửa
}
