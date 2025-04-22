import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceDetailRepository } from './invoice_details.repository';
import { CreateInvoiceDetailDto } from './dto/create_invoice_details.dto';
import { UpdateInvoiceDetailDto } from './dto/update_invoice_details.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

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

  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';
  
    const invoice_details = await this.repository.findAll(page, limit, newSort, keyword);
  
    // Lấy tất cả invoice_details để tính total
    const allInvoice_details = await this.repository.findAll(1, 0, newSort, keyword);
  
    return buildPagination(allInvoice_details, params, invoice_details);
  }

  async findAllByInvoiceId(id_invoice: string) {
    return this.repository.findAllByInvoiceId(id_invoice);
  }
}
