import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create_admin.dto';
import { UpdateAdminDto } from './dto/update_admin.dto';
import { AdminRepository } from './admin.repository';
import { buildPagination, checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { UpdateServiceDto } from 'src/service/dto/update_service.dto';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class AdminService {
  constructor(private readonly repository: AdminRepository) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const { name, email, password, role } = createAdminDto;
    const saltRounds = 10; // Số lượng salt rounds (nên đặt là 10 trở lên)
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Băm mật khẩu

    try {
      return await this.repository.create({
        name,
        email,
        password: hashedPassword, // Lưu mật khẩu đã băm
        role,
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
    const { name, email, password, role } = adminUpdate;
    let hashedPassword: string | undefined = undefined; // Khai báo rõ ràng kiểu

    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const service = await this.findById(id);

    try {
      return await this.repository.updateOne(id, service, {
        name,
        email,
        password: hashedPassword !== undefined ? hashedPassword : service.password,
        role,
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

  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';
  
    const admins = await this.repository.findAll(page, limit, newSort, keyword);
  
    // Lấy tất cả laundry_orders để tính total
    const allAdmins = await this.repository.findAll(1, 0, newSort, keyword);
  
    return buildPagination(allAdmins, params, admins);
  }
  async getOne(id: string) {
    const admin = await this.repository.findMe(id, '-password');
    if (!admin) {
      throw new UnauthorizedException('Không tìm thấy admin');
    }
    return admin;
  }
  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}