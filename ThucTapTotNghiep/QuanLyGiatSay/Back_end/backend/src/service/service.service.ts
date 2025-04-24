import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create_service.dto';        // DTO tạo mới dịch vụ
import { UpdateServiceDto } from './dto/update_service.dto';        // DTO cập nhật dịch vụ
import { ServiceRepository } from './service.repository';            // Repository cho dịch vụ
import { buildPagination, checkValisIsObject } from '../common/common';      // Các hàm tiện ích chung
import { ParamPaginationDto } from '../common/param-pagination.dto';        // DTO cho các tham số phân trang

@Injectable()
export class ServiceService {
  constructor(private readonly repository: ServiceRepository) {}

  /**
   * Tạo mới dịch vụ.
   * @param dto Dữ liệu tạo mới dịch vụ.
   * @returns Dịch vụ đã được tạo.
   * @throws UnprocessableEntityException nếu có lỗi xảy ra trong quá trình tạo.
   */
  async createService(dto: CreateServiceDto) {
    try {
      return await this.repository.create(dto);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  /**
   * Tìm dịch vụ theo ID.
   * @param id ID của dịch vụ.
   * @returns Dịch vụ.
   * @throws NotFoundException nếu không tìm thấy dịch vụ.
   */
  async findById(id: string) {
    checkValisIsObject(id, 'service id');
    const service = await this.repository.findOne(id);
    if (!service) throw new NotFoundException('Không tìm thấy dịch vụ');
    return service;
  }

  /**
   * Cập nhật thông tin dịch vụ theo ID.
   * @param id ID của dịch vụ cần cập nhật.
   * @param dto Dữ liệu cập nhật dịch vụ.
   * @returns Dịch vụ đã được cập nhật.
   * @throws UnprocessableEntityException nếu có lỗi xảy ra trong quá trình cập nhật (ví dụ: trùng tên).
   */
  async updateById(id: string, dto: UpdateServiceDto) {
    const existingService = await this.findById(id); // Lấy thông tin dịch vụ hiện tại
    try {
      return await this.repository.updateOne(id, existingService, dto);
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
    }
  }

  /**
   * Xóa dịch vụ theo ID.
   * @param id ID của dịch vụ cần xóa.
   * @returns Dịch vụ đã bị xóa.
   * @throws NotFoundException nếu không tìm thấy dịch vụ.
   */
  async deleteById(id: string) {
    const service = await this.findById(id); // Lấy thông tin dịch vụ để kiểm tra sự tồn tại
    await this.repository.deleteOne(service._id.toHexString());
    return service;
  }

  /**
   * Lấy danh sách dịch vụ có phân trang và tìm kiếm.
   * @param params Các tham số phân trang và tìm kiếm.
   * @returns Danh sách dịch vụ đã phân trang.
   */
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';

    const services = await this.repository.findAll(page, limit, newSort, keyword);

    // Lấy tất cả các dịch vụ để tính tổng số lượng
    const allServices = await this.repository.findAll(1, 0, newSort, keyword);

    return buildPagination(allServices, params, services);
  }

  /**
   * Lấy danh sách tất cả tên dịch vụ.
   * @returns Danh sách tất cả các tên dịch vụ.
   */
  async findAllGetName() {
    return this.repository.findAllGetName();
  }
}

