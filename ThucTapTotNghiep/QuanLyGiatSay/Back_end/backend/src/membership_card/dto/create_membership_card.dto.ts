import { IsDateString, IsNotEmpty, IsNumber, IsBoolean, IsMongoId } from 'class-validator';


export class CreateMembershipCardDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly id_customer: string;

  @IsNotEmpty()
  readonly card_number: string; // Đã sửa

  @IsDateString()
  readonly issue_date: Date; // Đã sửa

  @IsDateString()
  readonly expiry_date: Date; // Đã sửa

  @IsNumber()
  readonly points: number; // Đã sửa

  @IsBoolean()
  readonly status: boolean; // Đã sửa
}
