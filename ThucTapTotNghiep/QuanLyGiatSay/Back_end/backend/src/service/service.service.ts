// service.service.ts
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create_service.dto';
import { UpdateServiceDto } from './dto/update_service.dto';
import { ServiceRepository } from './service.repository';
import { checkValisIsObject } from '../common/common';
import { ParamPaginationDto } from '../common/param-pagination.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly repository: ServiceRepository) {}

  async createService(dto: CreateServiceDto) {
    try {
      return await this.repository.create(dto);
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findById(id: string) {
    checkValisIsObject(id, 'service id');
    const service = await this.repository.findOne(id);
    if (!service) throw new NotFoundException('Không tìm thấy dịch vụ');
    return service;
  }

  async updateById(id: string, dto: UpdateServiceDto) {
    const existingService = await this.findById(id);
    try {
      return await this.repository.updateOne(id, existingService, dto);
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
    }
  }

  async deleteById(id: string) {
    const service = await this.findById(id);
    await this.repository.deleteOne(service._id.toHexString());
    return service;
  }

  async findAll(params: ParamPaginationDto) {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const sort: 'asc' | 'desc' = params.sort !== 'asc' ? 'desc' : 'asc';
    const keyword = params.keyword || '';

    return this.repository.findAll(page, limit, sort, keyword);
  }

  async findAllGetName() {
    return this.repository.findAllGetName();
  }
}
