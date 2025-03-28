import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceRepository } from './invoice.repository';
import { CreateInvoiceDto } from './dto/create_invoice.dto';
import { UpdateInvoiceDto } from './dto/update_invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  // ✅ Tạo hóa đơn
  async create(data: CreateInvoiceDto): Promise<any> {
    try {
      console.log('📦 Dữ liệu hóa đơn chuẩn bị insert:', data);
      return await this.invoiceRepository.create(data);
    } catch (error) {
      console.error('❌ Lỗi khi tạo hóa đơn:', error);
      throw error;
    }
  }

  // ✅ Lấy một hóa đơn theo ID
  async findOne(id: string) {
    const invoice = await this.invoiceRepository.findOne(id);
    if (!invoice) {
      throw new NotFoundException('Không tìm thấy hóa đơn');
    }
    return invoice;
  }

  // ✅ Cập nhật hóa đơn
  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.findOne(id); // Kiểm tra sự tồn tại trước
    return this.invoiceRepository.updateOne(id, invoice, updateInvoiceDto);
  }

  // ✅ Xóa hóa đơn
  async delete(id: string) {
    await this.findOne(id); // Kiểm tra sự tồn tại trước
    return this.invoiceRepository.deleteOne(id);
  }

  // ✅ Cập nhật trạng thái hóa đơn
  async updateStatus(id: string, status: string) {
    await this.findOne(id); // Kiểm tra sự tồn tại trước
    return this.invoiceRepository.updateStatusById(id, status);
  }

  // ✅ Lấy danh sách hóa đơn có phân trang và tìm kiếm
  async findAll(page: number, limit: number, sort: 'asc' | 'desc', keyword?: string) {
    return this.invoiceRepository.findAll(page, limit, sort, keyword);
  }
}
