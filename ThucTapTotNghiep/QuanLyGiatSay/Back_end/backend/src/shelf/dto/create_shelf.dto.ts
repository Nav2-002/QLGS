import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateShelfDto {
  @IsNotEmpty()
  @IsString()
  readonly location: string; // Vị trí cụ thể

  @IsOptional()
  @IsString()
  readonly stage?: string; // Giai đoạn (nếu có)

  @IsOptional()
  @IsString()
  readonly note?: string; // Ghi chú

  @IsNotEmpty()
  readonly id_laundry_order: Types.ObjectId; // Liên kết đến đơn hàng giặt
}
