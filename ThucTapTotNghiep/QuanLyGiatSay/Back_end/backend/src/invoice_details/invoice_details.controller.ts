import { Controller, Get, Post, Patch, Delete, Param, Query, Body } from '@nestjs/common';
import { InvoiceDetailService } from './invoice_details.service';
import { CreateInvoiceDetailDto } from './dto/create_invoice_details.dto';
import { UpdateInvoiceDetailDto } from './dto/update_invoice_details.dto';

@Controller('invoice-details')
export class InvoiceDetailController {
  constructor(private readonly service: InvoiceDetailService) {}

  @Get()
  async getAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query('sort') sort: 'asc' | 'desc' = 'desc', @Query('keyword') keyword?: string) {
    return this.service.findAll(page, limit, sort, keyword);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateInvoiceDetailDto) {
    return this.service.create(createDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateInvoiceDetailDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Get('invoice/:id_invoice')
  async getAllByInvoice(@Param('id_invoice') id_invoice: string) {
    return this.service.findAllByInvoiceId(id_invoice);
  }
}
