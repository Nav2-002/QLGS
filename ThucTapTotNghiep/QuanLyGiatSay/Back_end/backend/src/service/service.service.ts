import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create_service.dto';
import { UpdateServiceDto } from './dto/update_service.dto';
import { ServiceRepository } from './service.repository';
import { checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly repository: ServiceRepository) {}

  async createService(createServiceDto: CreateServiceDto) {
    const { ten_dichvu, gia, mo_ta } = createServiceDto;

    try {
      return await this.repository.create({
        ten_dichvu,
        gia,
        mo_ta,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findById(id: string) {
    checkValisIsObject(id, 'service id');
    const service = await this.repository.findOne(id);
    if (!service) {
      throw new NotFoundException('không tìm thấy dịch vụ');
    }

    return service;
  }

  async updateById(id: string, serviceUpdate: UpdateServiceDto) {
    const { ten_dichvu, gia, mo_ta } = serviceUpdate;

    const service = await this.findById(id);

    try {
      return await this.repository.updateOne(id, service, {
        ten_dichvu,
        gia,
        mo_ta,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
    }
  }

  async deleteById(id: string) {
    const service = await this.findById(id);

    await this.repository.deleteOne(service._id.toHexString());

    return service;
  }

  findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;

    const newSort = sort != 'asc' ? 'desc' : 'asc';

    return this.repository.findAll(page, limit, newSort, keyword);
  }

  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}
