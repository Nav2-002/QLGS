import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create_staff.dto';
import { UpdateStaffDto } from './dto/update_staff.dto';
import { StaffRepository } from './staff.repository';
import { checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import * as bcrypt from 'bcrypt'; // Import bcrypt

@Injectable()
export class StaffService {
  constructor(private readonly repository: StaffRepository) {}

  async createStaff(createStaffDto: CreateStaffDto) {
    const { id_store, name, phoneNumber, email, role, password, status } = createStaffDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      if (id_store) {
        checkValisIsObject(id_store, 'id_store');
        // You might want to validate if the store exists here.
      }
      return await this.repository.create({
        id_store,
        name,
        phoneNumber,
        email,
        role,
        password: hashedPassword, // Lưu mật khẩu đã băm,
        status
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findById(id: string) {
    checkValisIsObject(id, 'staff id');
    const staff = await this.repository.findOne(id);
    if (!staff) {
      throw new NotFoundException('không tìm thấy nhân viên');
    }
    return staff;
  }

  async updateById(id: string, staffUpdate: UpdateStaffDto) {
    const { id_store, name, phoneNumber, email, password } = staffUpdate;
    let hashedPassword: string | undefined = undefined;

    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const staff = await this.findById(id);

    try {
      if (id_store) {
        checkValisIsObject(id_store, 'id_store');
        // You might want to validate if the store exists here.
      }

      return await this.repository.updateOne(id, staff, {
        id_store,
        name,
        phoneNumber,
        email,
        password: hashedPassword !== undefined ? hashedPassword : staff.password,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
    }
  }

  async deleteById(id: string) {
    const staff = await this.findById(id);
    await this.repository.deleteOne(staff._id.toHexString());
    return staff;
  }

  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'staff id');
    const updatedStaff = await this.repository.updateStatusById(id, status);
    if (!updatedStaff) {
      throw new NotFoundException('không tìm thấy id nhân viên');
    }
    return updatedStaff;
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