import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';
import { CreateSupplierDto } from './dto/create_supplier.dto';
import { UpdateSupplierDto } from './dto/update_supplier.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

@Injectable()
export class SupplierService {
  constructor(private readonly supplierRepository: SupplierRepository) {}

  // Tạo nhà cung cấp
  async create(createSupplierDto: CreateSupplierDto) {
    return await this.supplierRepository.create(createSupplierDto);
  }

  // Lấy 1 nhà cung cấp theo id
  async findOne(id: string) {
    const supplier = await this.supplierRepository.findOne(id);
    if (!supplier) {
      throw new NotFoundException('Không tìm thấy nhà cung cấp');
    }
    return supplier;
  }

  // Cập nhật nhà cung cấp
  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplierOld = await this.supplierRepository.findOne(id);
    if (!supplierOld) {
      throw new NotFoundException('Không tìm thấy nhà cung cấp để cập nhật');
    }

    const updatedSupplier = await this.supplierRepository.updateOne(id, updateSupplierDto);
    if (!updatedSupplier) {
      throw new NotFoundException('Cập nhật nhà cung cấp thất bại');
    }

    return updatedSupplier;
  }

  // Xóa nhà cung cấp
  async delete(id: string) {
    const supplier = await this.supplierRepository.findOne(id);
    if (!supplier) {
      throw new NotFoundException('Không tìm thấy nhà cung cấp để xóa');
    }
    return await this.supplierRepository.deleteOne(id);
  }

  // Lấy danh sách có phân trang và tìm kiếm
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';
  
    const suppliers = await this.supplierRepository.findAll(page, limit, newSort, keyword);
  
    // Lấy tất cả suppliers để tính total
    const allSuppliers = await this.supplierRepository.findAll(1, 0, newSort, keyword);
  
    return buildPagination(allSuppliers, params, suppliers);
  }
}
