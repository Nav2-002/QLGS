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
import { CreateStoreDto } from 'src/store/dto/create_store.dto';
import { CreateMembershipCardDto } from 'src/membership_card/dto/create_membership_card.dto';
import { UpdateMembershipCardDto } from 'src/membership_card/dto/update_membership_card.dto';

@Injectable()
export class StaffService {
  constructor(private readonly repository: StaffRepository) {}

  async createStaff(createStaffDto: CreateStaffDto) {
    const { id_store, ten, sodienthoai, email, vaitro, matkhau } =
      createStaffDto;

    try {
      if (id_store) {
        checkValisIsObject(id_store, 'id_store');
        // You might want to validate if the staff exists here, similar to the previous example.
      }
      return await this.repository.create({
        id_store,
        ten,
        sodienthoai,
        email,
        vaitro,
        matkhau,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findById(id: string) {
    checkValisIsObject(id, 'store id');
    const store = await this.repository.findOne(id);
    if (!store) {
      throw new NotFoundException('không tìm thấy cửa hàng');
    }

    return store;
  }

  async updateById(id: string, staffUpdate: UpdateStaffDto) {
    const { id_store, ten, sodienthoai, email, vaitro, matkhau } =
      staffUpdate;

    const store = await this.findById(id);

    try {
      if (id_store) {
        checkValisIsObject(id_store, 'id_store');
        // You might want to validate if the staff exists here, similar to the previous example.
      }

      return await this.repository.updateOne(id, store, {
        id_store,
        ten,
        sodienthoai,
        email,
        vaitro,
        matkhau,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
    }
  }

  async deleteById(id: string) {
    const store = await this.findById(id);

    await this.repository.deleteOne(store._id.toHexString());

    return store;
  }

  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'store id');

    const staff = await this.repository.updateStatusById(id, status);
    if (!staff) {
      throw new NotFoundException('không tìm thấy id nhân viên');
    }

    return staff;
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