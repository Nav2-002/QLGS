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

@Injectable()
export class MembershipCardService {
  constructor(private readonly repository: MembershipCardRepository) {}

  async createMembershipCard(createMembershipCardDto: CreateMembershipCardDto) {
    const { id_customer, card_number, issue_date, expiry_date, points, status } =
      createMembershipCardDto;

    try {
      if (id_customer) {
        checkValisIsObject(id_customer, 'id_customer');
        // You might want to validate if the customer exists here.
      }
      return await this.repository.create({
        id_customer,
        card_number, // Đã sửa
        issue_date,  // Đã sửa
        expiry_date, // Đã sửa
        points,      // Đã sửa
        status,      // Đã sửa
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findById(id: string) {
    checkValisIsObject(id, 'membership card id'); // Sửa message cho đúng entity
    const membershipCard = await this.repository.findOne(id);
    if (!membershipCard) {
      throw new NotFoundException('không tìm thấy thẻ thành viên'); // Sửa message cho đúng entity
    }
    return membershipCard;
  }

  async updateById(id: string, membershipCardUpdate: UpdateMembershipCardDto) {
    const { id_customer, card_number, issue_date, expiry_date, points, status } =
      membershipCardUpdate;

    const existingCard = await this.findById(id); // Tìm thẻ hiện tại

    try {
      if (id_customer) {
        checkValisIsObject(id_customer, 'id_customer');
        // You might want to validate if the customer exists here.
      }

      return await this.repository.updateOne(id, existingCard, {
        id_customer,
        card_number, // Đã sửa
        issue_date,  // Đã sửa
        expiry_date, // Đã sửa
        points,      // Đã sửa
        status,      // Đã sửa
      });
    } catch (error) {
      throw new UnprocessableEntityException('Lỗi khi cập nhật thẻ thành viên'); // Sửa message
    }
  }

  async deleteById(id: string) {
    const membershipCard = await this.findById(id); // Tìm thẻ để xóa
    await this.repository.deleteOne(membershipCard._id.toHexString());
    return membershipCard;
  }

  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'membership card id'); // Sửa message

    const updatedCard = await this.repository.updateStatusById(id, status);
    if (!updatedCard) {
      throw new NotFoundException('không tìm thấy id thẻ thành viên');
    }
    return updatedCard;
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
