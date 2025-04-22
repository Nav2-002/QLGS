import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
  } from '@nestjs/common';
  import { CreateInvoiceDto } from './dto/create_invoice.dto';
  import { UpdateInvoiceDto } from './dto/update_invoice.dto';
  import { Invoice } from './model/invoice.schema';
  import { InvoiceService } from './invoice.service';
  import { ParamPaginationDto } from 'src/common/param-pagination.dto';
  import { buildPagination } from 'src/common/common';
  
  @Controller('invoices')
  export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}
  
    // ✅ Lấy danh sách hóa đơn có phân trang + tìm kiếm
    @Get()
    async getAll(@Query() query: ParamPaginationDto) {
      return this.invoiceService.findAll(query);
    }
  
    // ✅ Tạo hóa đơn mới
    @Post()
    async create(@Body() body: CreateInvoiceDto) {
      console.log('📥 Body nhận được:', body);
      return this.invoiceService.create(body);
    }
  
    // ✅ Lấy chi tiết hóa đơn theo ID
    @Get(':id')
    getOne(@Param('id') id: string) {
      return this.invoiceService.findOne(id);
    }
  
    // ✅ Cập nhật hóa đơn
    @Patch(':id')
    async updateOne(@Param('id') id: string, @Body() invoice: UpdateInvoiceDto) {
      const updatedInvoice = await this.invoiceService.update(id, invoice);
      return {
        message: `Cập nhật thông tin hóa đơn thành công.`,
        updatedInvoice,
      };
    }
  
    // ✅ Cập nhật trạng thái hóa đơn (dùng route riêng)
    @Patch(':id/status')
    async updateStatus(@Param('id') id: string, @Query('status') status: string) {
      const updatedStatus = await this.invoiceService.updateStatus(id, status);
      return {
        message: `Cập nhật trạng thái hóa đơn thành công.`,
        updatedStatus,
      };
    }
  
    // ✅ Xóa hóa đơn
    @Delete(':id')
    async deleteOne(@Param('id') id: string) {
      await this.invoiceService.delete(id);
      return {
        message: `Xóa hóa đơn có ID ${id} thành công.`,
        deletedId: id,
      };
    }
  }
  
