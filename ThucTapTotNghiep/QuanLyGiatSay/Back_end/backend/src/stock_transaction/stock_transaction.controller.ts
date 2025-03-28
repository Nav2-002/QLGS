import { 
  Controller, Get, Post, Patch, Delete, Param, Query, Body 
} from '@nestjs/common';
import { StockTransactionService } from './stock_transaction.service';
import { CreateStockTransactionDto } from './dto/create_stock_transaction.dto';
import { UpdateStockTransactionDto } from './dto/update_stock_transaction.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

@Controller('stock-transactions')
export class StockTransactionController {
  constructor(private readonly service: StockTransactionService) {}

  // ✅ Lấy danh sách giao dịch kho (có phân trang & tìm kiếm)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    console.log('📥 Query Params:', params);

    const stockTransactions = await this.service.findAll(
      params.page,
      params.limit,
      params.sort as 'asc' | 'desc',
      params.keyword,
    );

    return buildPagination(stockTransactions, params);
  }

  // ✅ Lấy chi tiết một giao dịch kho theo ID
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // ✅ Tạo mới một giao dịch kho
  @Post()
  async create(@Body() createDto: CreateStockTransactionDto) {
    console.log('📥 Tạo giao dịch kho:', createDto);
    return this.service.create(createDto);
  }

  // ✅ Cập nhật thông tin giao dịch kho
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateStockTransactionDto) {
    const updatedTransaction = await this.service.update(id, updateDto);
    return {
      message: `✅ Cập nhật giao dịch kho thành công.`,
      updatedTransaction,
    };
  }

  // ✅ Xóa giao dịch kho theo ID
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.service.delete(id);
    return {
      message: `🗑️ Đã xóa giao dịch kho có ID: ${id}`,
    };
  }
}
