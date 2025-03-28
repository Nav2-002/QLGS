import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStockTransactionDto } from './dto/create_stock_transaction.dto';
import { UpdateStockTransactionDto } from './dto/update_stock_transaction.dto';
import { StockTransaction, StockTransactionDocument } from './model/stock_transaction.schema';

@Injectable()
export class StockTransactionRepository {
  constructor(
    @InjectModel(StockTransaction.name)
    private readonly model: Model<StockTransactionDocument>,
  ) {}

  // ✅ Tạo mới giao dịch kho
  async create(dto: CreateStockTransactionDto): Promise<StockTransaction> {
    const newTransaction = new this.model(dto);
    return await newTransaction.save();
  }

  // ✅ Lấy thông tin giao dịch kho theo ID
  async findOne(id: string) {
    return await this.model.findById(id).lean<StockTransaction>();
  }

  // ✅ Cập nhật giao dịch kho
  async updateOne(id: string, updateDto: UpdateStockTransactionDto) {
    const updatedTransaction = await this.model.findByIdAndUpdate(id, updateDto, { new: true });
    if (!updatedTransaction) {
      throw new Error('Không tìm thấy giao dịch kho để cập nhật.');
    }
    return updatedTransaction;
  }

  // ✅ Xóa giao dịch kho
  async deleteOne(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  // ✅ Lấy danh sách giao dịch kho (phân trang, tìm kiếm)
  async findAll(page: number, limit: number, sort: 'asc' | 'desc', keyword?: string) {
    const filter = keyword
      ? { 'details.note': { $regex: keyword, $options: 'i' } }
      : {};

    return await this.model
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: sort === 'asc' ? 1 : -1 })
      .lean<StockTransaction[]>();
  }
}
