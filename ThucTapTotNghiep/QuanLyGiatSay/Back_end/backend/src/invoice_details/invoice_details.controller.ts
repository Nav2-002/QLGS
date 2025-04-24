import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { InvoiceDetailService } from './invoice_details.service';
import { CreateInvoiceDetailDto } from './dto/create_invoice_details.dto';
import { UpdateInvoiceDetailDto } from './dto/update_invoice_details.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Controller('invoice-details')
export class InvoiceDetailController {
  constructor(private readonly service: InvoiceDetailService) {}

  /**
   * Lấy danh sách chi tiết hóa đơn (có phân trang).
   */
  @Get()
  async getAll(@Query() query: ParamPaginationDto) {
    return this.service.findAll(query);
  }

  /**
   * Lấy chi tiết hóa đơn theo ID.
   */
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /**
   * Tạo mới chi tiết hóa đơn.
   */
  @Post()
  async create(@Body() createDto: CreateInvoiceDetailDto) {
    return this.service.create(createDto);
  }

  /**
   * Cập nhật chi tiết hóa đơn theo ID.
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateInvoiceDetailDto) {
    return this.service.update(id, updateDto);
  }

  /**
   * Xóa chi tiết hóa đơn theo ID.
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  /**
   * Lấy tất cả chi tiết hóa đơn của một hóa đơn (theo ID hóa đơn).
   */
  @Get('invoice/:id_invoice')
  async getAllByInvoice(@Param('id_invoice') id_invoice: string) {
    return this.service.findAllByInvoiceId(id_invoice);
  }
}
