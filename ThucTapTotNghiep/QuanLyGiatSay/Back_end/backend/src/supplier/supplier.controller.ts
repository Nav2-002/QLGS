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
import { CreateSupplierDto } from './dto/create_supplier.dto';
import { UpdateSupplierDto } from './dto/update_supplier.dto';
import { SupplierService } from './supplier.service';

@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  // Lấy danh sách nhà cung cấp
  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: 'asc' | 'desc',
    @Query('keyword') keyword?: string,
  ) {
    return await this.supplierService.findAll(page, limit, sort, keyword);
  }

  // Tạo nhà cung cấp
  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    const newSupplier = await this.supplierService.create(createSupplierDto);
    return {
      message: 'Tạo nhà cung cấp thành công.',
      supplier: newSupplier,
    };
  }

  // Lấy nhà cung cấp theo ID
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.supplierService.findOne(id);
  }

  // Cập nhật nhà cung cấp
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    const updatedSupplier = await this.supplierService.update(id, updateSupplierDto);
    return {
      message: 'Cập nhật nhà cung cấp thành công.',
      supplier: updatedSupplier,
    };
  }

  // Xóa nhà cung cấp
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.supplierService.delete(id);
    return {
      message: 'Xóa nhà cung cấp thành công.',
      deletedId: id,
    };
  }
}
