import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceDetailRepository } from './invoice_details.repository';
import { CreateInvoiceDetailDto } from './dto/create_invoice_details.dto';
import { UpdateInvoiceDetailDto } from './dto/update_invoice_details.dto';

@Injectable()
export class InvoiceDetailService {
  constructor(private readonly repository: InvoiceDetailRepository) {}

  async create(dto: CreateInvoiceDetailDto) {
    return this.repository.create(dto);
  }

  async findOne(id: string) {
    const detail = await this.repository.findOne(id);
    if (!detail) {
      throw new NotFoundException(`Không tìm thấy chi tiết hóa đơn có ID: ${id}`);
    }
    return detail;
  }

  async update(id: string, dto: UpdateInvoiceDetailDto) {
    await this.findOne(id);
    return this.repository.updateOne(id, dto);
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.repository.deleteOne(id);
  }

  async findAll(page: number, limit: number, sort: 'asc' | 'desc', keyword?: string) {
    return this.repository.findAll(page, limit, sort, keyword);
  }

  async findAllByInvoiceId(id_invoice: string) {
    return this.repository.findAllByInvoiceId(id_invoice);
  }
}
