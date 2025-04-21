import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMembershipCardDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly id_khachhang: string;

  @IsNotEmpty()
  readonly so_the: string;

  @IsDateString()
  readonly ngay_cap: Date;

  @IsDateString()
  readonly ngay_het_han: Date;

  @IsNumber()
  readonly diem_tich_luy: number;

  @IsBoolean()
  readonly trangthai: boolean;
}
