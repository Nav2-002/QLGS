import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateMembershipCardDto } from './dto/create_membership_card.dto';        // DTO tạo mới thẻ thành viên
import { UpdateMembershipCardDto } from './dto/update_membership_card.dto';        // DTO cập nhật thẻ thành viên
import { MembershipCardRepository } from './membership_card.repository';            // Repository cho thẻ thành viên
import { checkValisIsObject } from 'src/common/common';                      // Hàm kiểm tra tính hợp lệ của ObjectId
import { ParamPaginationDto } from 'src/common/param-pagination.dto';            // DTO cho phân trang

@Injectable()
export class MembershipCardService {
  constructor(private readonly repository: MembershipCardRepository) {}

  /**
   * Tạo mới thẻ thành viên.
   * @param createMembershipCardDto Dữ liệu tạo mới thẻ thành viên.
   * @returns Thẻ thành viên đã được tạo.
   * @throws UnprocessableEntityException nếu có lỗi trong quá trình tạo.
   */
  async createMembershipCard(createMembershipCardDto: CreateMembershipCardDto) {
    const { id_customer, card_number, issue_date, expiry_date, points, status } =
      createMembershipCardDto;

    try {
      if (id_customer) {
        checkValisIsObject(id_customer, 'id_customer');
        // Bạn có thể muốn thêm logic kiểm tra xem customer có tồn tại hay không ở đây.
      }
      return await this.repository.create({
        id_customer,
        card_number,
        issue_date,
        expiry_date,
        points,
        status,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  /**
   * Tìm thẻ thành viên theo ID.
   * @param id ID của thẻ thành viên.
   * @returns Thẻ thành viên.
   * @throws NotFoundException nếu không tìm thấy thẻ thành viên.
   */
  async findById(id: string) {
    checkValisIsObject(id, 'membership card id');
    const membershipCard = await this.repository.findOne(id);
    if (!membershipCard) {
      throw new NotFoundException('không tìm thấy thẻ thành viên');
    }
    return membershipCard;
  }

  /**
   * Cập nhật thông tin thẻ thành viên theo ID.
   * @param id ID của thẻ thành viên.
   * @param membershipCardUpdate Dữ liệu cập nhật thẻ thành viên.
   * @returns Thẻ thành viên đã được cập nhật.
   * @throws UnprocessableEntityException nếu có lỗi trong quá trình cập nhật.
   * @throws NotFoundException nếu không tìm thấy thẻ thành viên.
   */
  async updateById(id: string, membershipCardUpdate: UpdateMembershipCardDto) {
    const { id_customer, card_number, issue_date, expiry_date, points, status } =
      membershipCardUpdate;

    const existingCard = await this.findById(id); // Tìm thẻ hiện tại để đảm bảo tồn tại

    try {
      if (id_customer) {
        checkValisIsObject(id_customer, 'id_customer');
        // Bạn có thể muốn thêm logic kiểm tra xem customer có tồn tại hay không ở đây.
      }

      return await this.repository.updateOne(id, existingCard, {
        id_customer,
        card_number,
        issue_date,
        expiry_date,
        points,
        status,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Lỗi khi cập nhật thẻ thành viên');
    }
  }

  /**
   * Xóa thẻ thành viên theo ID.
   * @param id ID của thẻ thành viên.
   * @returns Thẻ thành viên đã bị xóa.
   * @throws NotFoundException nếu không tìm thấy thẻ thành viên để xóa.
   */
  async deleteById(id: string) {
    const membershipCard = await this.findById(id); // Tìm thẻ để đảm bảo tồn tại
    await this.repository.deleteOne(membershipCard._id.toHexString());
    return membershipCard;
  }

  /**
   * Cập nhật trạng thái của thẻ thành viên theo ID.
   * @param id ID của thẻ thành viên.
   * @param status Trạng thái mới của thẻ thành viên.
   * @returns Thẻ thành viên đã được cập nhật trạng thái.
   * @throws NotFoundException nếu không tìm thấy thẻ thành viên.
   */
  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'membership card id');

    const updatedCard = await this.repository.updateStatusById(id, status);
    if (!updatedCard) {
      throw new NotFoundException('không tìm thấy id thẻ thành viên');
    }
    return updatedCard;
  }

  /**
   * Lấy danh sách thẻ thành viên có phân trang và tìm kiếm.
   * @param params Các tham số phân trang và tìm kiếm.
   * @returns Danh sách thẻ thành viên đã phân trang.
   */
  findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort != 'asc' ? 'desc' : 'asc';
    return this.repository.findAll(page, limit, newSort, keyword);
  }

  /**
   * Lấy danh sách tất cả thẻ thành viên.
   * @returns Danh sách tất cả tên thẻ thành viên.
   */
  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}
