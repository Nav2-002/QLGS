import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateMembershipCardDto } from './dto/create_membership_card.dto';
import { UpdateMembershipCardDto } from './dto/update_membership_card.dto';
import { MembershipCardRepository } from './membership_card.repository';
import { checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { CreateStoreDto } from 'src/store/dto/create_store.dto';

@Injectable()
export class MembershipCardService {
  constructor(private readonly repository: MembershipCardRepository) {}

  async createMembershipCard(createMembershipCardDto: CreateMembershipCardDto) {
    const { id_khachhang, so_the, ngay_cap, ngay_het_han, diem_tich_luy, trangthai } =
      createMembershipCardDto;

    try {
      if (id_khachhang) {
        checkValisIsObject(id_khachhang, 'id_khachhang');
        // You might want to validate if the staff exists here, similar to the previous example.
      }
      return await this.repository.create({
        id_khachhang,
        so_the,
        ngay_cap,
        ngay_het_han,
        diem_tich_luy,
        trangthai,
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

  async updateById(id: string, membershipCardUpdate: UpdateMembershipCardDto) {
    const { id_khachhang, so_the, ngay_cap, ngay_het_han, diem_tich_luy, trangthai } =
      membershipCardUpdate;

    const store = await this.findById(id);

    try {
      if (id_khachhang) {
        checkValisIsObject(id_khachhang, 'id_khachhang');
        // You might want to validate if the staff exists here, similar to the previous example.
      }

      return await this.repository.updateOne(id, store, {
        id_khachhang,
        so_the,
        ngay_cap,
        ngay_het_han,
        diem_tich_luy,
        trangthai,
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

    const membershipCard = await this.repository.updateStatusById(id, status);
    if (!membershipCard) {
      throw new NotFoundException('không tìm thấy id thẻ thành viên');
    }

    return membershipCard;
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