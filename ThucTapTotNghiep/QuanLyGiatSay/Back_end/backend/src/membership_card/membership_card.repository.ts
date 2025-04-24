import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMembershipCardDto } from './dto/create_membership_card.dto';      // DTO cho tạo mới thẻ thành viên
import { UpdateMembershipCardDto } from './dto/update_membership_card.dto';      // DTO cho cập nhật thẻ thành viên
import { MembershipCard } from 'src/membership_card/model/membership_card.schema';        // Model của thẻ thành viên

@Injectable()
export class MembershipCardRepository {
  constructor(@InjectModel(MembershipCard.name) private readonly model: Model<MembershipCard>) {}

  /**
   * Tạo mới thẻ thành viên.
   * @param membershipCard Dữ liệu tạo mới thẻ thành viên.
   * @returns Thẻ thành viên đã được tạo.
   */
  async create(membershipCard: CreateMembershipCardDto) {
    const newMembershipCard = await new this.model({
      _id: new Types.ObjectId(),
      ...membershipCard,
    }).save();

    return newMembershipCard;
  }

  /**
   * Tìm thẻ thành viên theo ID.
   * @param id ID của thẻ thành viên.
   * @returns Thẻ thành viên hoặc null nếu không tìm thấy.
   */
  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<MembershipCard>(true);
  }

  /**
   * Cập nhật thông tin thẻ thành viên theo ID.
   * @param id ID của thẻ thành viên.
   * @param membershipCardOld Thông tin thẻ thành viên cũ.
   * @param membershipCardNew Thông tin thẻ thành viên mới.
   * @returns Thẻ thành viên đã được cập nhật.
   */
  async updateOne(id: string, membershipCardOld: MembershipCard, membershipCardNew: UpdateMembershipCardDto) {
    const updateMembershipCard = await this.model.findOneAndUpdate(
      { _id: id },
      membershipCardNew,
      {
        new: true,
      },
    );

    return updateMembershipCard;
  }

  /**
   * Xóa thẻ thành viên theo ID.
   * @param id ID của thẻ thành viên.
   * @returns Kết quả của thao tác xóa.
   */
  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  /**
   * Cập nhật trạng thái của thẻ thành viên theo ID.
   * @param id ID của thẻ thành viên.
   * @param status Trạng thái mới của thẻ thành viên.
   * @returns Thẻ thành viên đã được cập nhật trạng thái.
   */
  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { trangthai: status }, { new: true })
      .lean<MembershipCard>(true);
  }

  /**
   * Tìm tất cả thẻ thành viên có phân trang, sắp xếp và tìm kiếm theo từ khóa.
   * @param page Số trang.
   * @param limit Số lượng kết quả trên mỗi trang.
   * @param sort Thứ tự sắp xếp ('asc' hoặc 'desc') theo số thẻ.
   * @param keyword Từ khóa tìm kiếm (trong trường 'card_number').
   * @returns Mảng các thẻ thành viên.
   */
  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ card_number: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ so_the: sort })
      .limit(limit)
      .lean<MembershipCard[]>(true);
  }

  /**
   * Lấy danh sách tất cả thẻ thành viên.
   * @returns Mảng tất cả các thẻ thành viên.
   */
  async findAllGetName() {
    return await this.model.find().lean<MembershipCard[]>(true);
  }
}

