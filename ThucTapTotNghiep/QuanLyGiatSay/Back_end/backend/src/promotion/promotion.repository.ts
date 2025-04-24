import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePromotionDto } from './dto/create_promotion.dto';      // DTO cho tạo mới khuyến mãi
import { UpdatePromotionDto } from './dto/update_promotion.dto';      // DTO cho cập nhật khuyến mãi
import { Promotion } from 'src/promotion/model/promotion.schema';        // Model của khuyến mãi

@Injectable()
export class PromotionRepository {
  constructor(@InjectModel(Promotion.name) private readonly model: Model<Promotion>) {}

  /**
   * Tạo mới khuyến mãi.
   * @param promotion Dữ liệu tạo mới khuyến mãi.
   * @returns Khuyến mãi đã được tạo.
   */
  async create(promotion: CreatePromotionDto) {
    const newPromotion = await new this.model({
      _id: new Types.ObjectId(),
      ...promotion,
    }).save();

    return newPromotion;
  }

  /**
   * Tìm khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @returns Khuyến mãi hoặc null nếu không tìm thấy.
   */
  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Promotion>(true);
  }

  /**
   * Cập nhật thông tin khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @param promotionOld Thông tin khuyến mãi cũ.
   * @param promotionNew Thông tin khuyến mãi mới.
   * @returns Khuyến mãi đã được cập nhật.
   */
  async updateOne(id: string, promotionOld: Promotion, promotionNew: UpdatePromotionDto) {
    const updatePromotion = await this.model.findOneAndUpdate(
      { _id: id },
      promotionNew,
      {
        new: true,
      },
    );

    return updatePromotion;
  }

  /**
   * Xóa khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @returns Kết quả của thao tác xóa.
   */
  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  /**
   * Cập nhật trạng thái của khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @param status Trạng thái mới.
   * @returns Khuyến mãi đã được cập nhật trạng thái.
   */
  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { trangthai: status }, { new: true })
      .lean<Promotion>(true);
  }

  /**
   * Tìm tất cả khuyến mãi có phân trang, sắp xếp và tìm kiếm theo từ khóa.
   * @param page Số trang.
   * @param limit Số lượng kết quả trên mỗi trang.
   * @param sort Thứ tự sắp xếp ('asc' hoặc 'desc').
   * @param keyword Từ khóa tìm kiếm (trong trường 'name').
   * @returns Mảng các khuyến mãi.
   */
  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ name: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ name: sort })
      .limit(limit)
      .lean<Promotion[]>(true);
  }

  /**
   * Lấy danh sách tất cả khuyến mãi.
   * @returns Mảng tất cả các khuyến mãi.
   */
  async findAllGetName() {
    return await this.model.find().lean<Promotion[]>(true);
  }
}
