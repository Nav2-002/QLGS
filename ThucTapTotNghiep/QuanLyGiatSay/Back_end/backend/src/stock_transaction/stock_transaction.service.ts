import { Injectable, NotFoundException } from '@nestjs/common';
import { StockTransactionRepository } from './stock_transaction.repository';
import { CreateStockTransactionDto } from './dto/create_stock_transaction.dto';
import { UpdateStockTransactionDto } from './dto/update_stock_transaction.dto';

@Injectable()
export class StockTransactionService {
  constructor(private readonly repository: StockTransactionRepository) {}

  // ✅ Tạo mới giao dịch kho
  async create(dto: CreateStockTransactionDto) {
    try {
      console.log('📦 Dữ liệu giao dịch kho nhận được:', dto);
      return await this.repository.create(dto);
    } catch (error) {
      console.error('❌ Lỗi khi tạo giao dịch kho:', error);
      throw error;
    }
  }

  // ✅ Lấy danh sách giao dịch kho (phân trang, tìm kiếm)
  async findAll(page: number, limit: number, sort: 'asc' | 'desc', keyword?: string) {
    return await this.repository.findAll(page, limit, sort, keyword);
  }

  // ✅ Lấy thông tin chi tiết giao dịch kho theo ID
  async findOne(id: string) {
    const transaction = await this.repository.findOne(id);
    if (!transaction) {
      throw new NotFoundException(`🚫 Không tìm thấy giao dịch kho có ID: ${id}`);
    }
    return transaction;
  }

  // ✅ Cập nhật giao dịch kho
  async update(id: string, updateDto: UpdateStockTransactionDto) {
    await this.findOne(id); // Kiểm tra tồn tại trước
    return await this.repository.updateOne(id, updateDto);
  }

  // ✅ Xóa giao dịch kho
  async delete(id: string) {
    await this.findOne(id); // Kiểm tra tồn tại trước
    return await this.repository.deleteOne(id);
  }
}
