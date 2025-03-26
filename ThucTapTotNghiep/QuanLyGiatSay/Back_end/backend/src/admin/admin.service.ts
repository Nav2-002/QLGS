import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create_admin.dto';
import { UpdateAdminDto } from './dto/update_admin.dto';
import { AdminRepository } from './admin.repository';
import { checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { UpdateServiceDto } from 'src/service/dto/update_service.dto';

@Injectable()
export class AdminService {
  constructor(private readonly repository: AdminRepository) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const { ten, email, mat_khau, vaitro } = createAdminDto;

    try {
      return await this.repository.create({
        ten,
        email,
        mat_khau,
        vaitro,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findById(id: string) {
    checkValisIsObject(id, 'admin id');
    const admin = await this.repository.findOne(id);
    if (!admin) {
      throw new NotFoundException('không tìm thấy admin');
    }

    return admin;
  }

  async updateById(id: string, adminUpdate: UpdateAdminDto) {
    const { ten, email, mat_khau, vaitro } = adminUpdate;

    const service = await this.findById(id);

    try {
      return await this.repository.updateOne(id, service, {
        ten,
        email,
        mat_khau,
        vaitro,
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
