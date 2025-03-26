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
  
  @Injectable()
  export class AdminService {
    constructor(private readonly repository: AdminRepository) {}
  
    async createAdmin(createAdminDto: CreateAdminDto) {
        const { name, email, password, role } = createAdminDto;
      
        try {
          return await this.repository.create({
            name,
            email,
            password,
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
  
      const admin = await this.findById(id);
  
      try {
        return await this.repository.updateOne(id, admin, {
          name,
          email,
          password,
          role,
        });
      } catch (error) {
        throw new UnprocessableEntityException('Tên đã tồn tại');
      }
    }
  
    async deleteById(id: string) {
      const admin = await this.findById(id);
  
      await this.repository.deleteOne(admin._id.toHexString());
  
      return admin;
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
  