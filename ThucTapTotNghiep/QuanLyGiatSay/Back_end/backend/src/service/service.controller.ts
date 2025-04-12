// service.controller.ts
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
import { CreateServiceDto } from './dto/create_service.dto';
import { UpdateServiceDto } from './dto/update_service.dto';
import { Service } from './model/service.schema';
import { ServiceService } from './service.service';
import { ParamPaginationDto } from '../common/param-pagination.dto';
import { buildPagination } from '../common/common';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  // ✅ API mới để lấy tất cả dịch vụ không cần phân trang
  @Get('list')
  async getAllServices() {
    const params: ParamPaginationDto = {
      page: 1,
      limit: 1000,
      sort: '',
      keyword: '',
    };
    const services = await this.serviceService.findAll(params);
    return { data: services };
  }

  @Get('all')
  getAllGetName() {
    return this.serviceService.findAllGetName();
  }

  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const services = await this.serviceService.findAll(params);
    const rootServices = services.filter(service => service.description === null);
    return buildPagination<Service>(services, params, rootServices);
  }

  @Post()
  async create(@Body() service: CreateServiceDto) {
    const newService = await this.serviceService.createService(service);
    return {
      message: 'Tạo dịch vụ thành công.',
      service: newService,
    };
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.serviceService.findById(id);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() service: UpdateServiceDto) {
    const updatedService = await this.serviceService.updateById(id, service);
    return {
      message: 'Cập nhật thông tin dịch vụ thành công.',
      updatedService,
    };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.serviceService.deleteById(id);
    return {
      message: 'Xóa dịch vụ thành công.',
      deletedId: id,
    };
  }
}
