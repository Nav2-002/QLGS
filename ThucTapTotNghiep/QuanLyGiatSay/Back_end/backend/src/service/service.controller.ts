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
import { CreateServiceDto } from './dto/create_service.dto';        // DTO tạo mới dịch vụ
import { UpdateServiceDto } from './dto/update_service.dto';        // DTO cập nhật dịch vụ
import { Service } from './model/service.schema';              // Model của dịch vụ (có thể không cần thiết ở đây)
import { ServiceService } from './service.service';            // Service xử lý logic dịch vụ
import { ParamPaginationDto } from '../common/param-pagination.dto';  // DTO phân trang
import { buildPagination } from '../common/common';            // Hàm tiện ích phân trang (có thể không cần thiết ở đây)

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  /**
   * Lấy danh sách tất cả dịch vụ (không phân trang).
   * @returns Danh sách tất cả dịch vụ.
   */
  @Get('list')
  async getAllServices() {
    const params: ParamPaginationDto = {
      page: 1,
      limit: 1000, // Đặt một giới hạn đủ lớn để lấy tất cả dịch vụ
      sort: '',
      keyword: '',
    };
    const services = await this.serviceService.findAll(params);
    return { data: services };
  }

  /**
   * Lấy danh sách tên tất cả dịch vụ.
   * @returns Danh sách tên dịch vụ.
   */
  @Get('all')
  getAllGetName() {
    return this.serviceService.findAllGetName();
  }

  /**
   * Lấy danh sách dịch vụ có phân trang.
   * @param query Các tham số phân trang.
   * @returns Danh sách dịch vụ đã phân trang.
   */
  @Get()
  async getAll(@Query() query: ParamPaginationDto) {
    return this.serviceService.findAll(query);
  }

  /**
   * Tạo mới dịch vụ.
   * @param service Dữ liệu tạo mới dịch vụ.
   * @returns Dịch vụ đã được tạo.
   */
  @Post()
  async create(@Body() service: CreateServiceDto) {
    const newService = await this.serviceService.createService(service);
    return {
      message: 'Tạo dịch vụ thành công.',
      service: newService,
    };
  }

  /**
   * Lấy thông tin dịch vụ theo ID.
   * @param id ID của dịch vụ.
   * @returns Dịch vụ.
   */
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.serviceService.findById(id);
  }

  /**
   * Cập nhật thông tin dịch vụ theo ID.
   * @param id ID của dịch vụ.
   * @param service Dữ liệu cập nhật dịch vụ.
   * @returns Dịch vụ đã được cập nhật.
   */
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() service: UpdateServiceDto) {
    const updatedService = await this.serviceService.updateById(id, service);
    return {
      message: 'Cập nhật thông tin dịch vụ thành công.',
      updatedService,
    };
  }

  /**
   * Xóa dịch vụ theo ID.
   * @param id ID của dịch vụ.
   * @returns Kết quả của thao tác xóa.
   */
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.serviceService.deleteById(id);
    return {
      message: 'Xóa dịch vụ thành công.',
      deletedId: id,
    };
  }
}

