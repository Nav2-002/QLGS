import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePromotionDto } from './dto/create_promotion.dto';        // DTO tạo mới khuyến mãi
import { UpdatePromotionDto } from './dto/update_promotion.dto';        // DTO cập nhật khuyến mãi
import { PromotionRepository } from './promotion.repository';            // Repository cho khuyến mãi
import { buildPagination, checkValisIsObject } from 'src/common/common';      // Hàm tiện ích
import { ParamPaginationDto } from 'src/common/param-pagination.dto';        // DTO cho phân trang
import { validate } from 'class-validator';                      // Thư viện validate

@Injectable()
export class PromotionService {
  constructor(private readonly repository: PromotionRepository) {}

  /**
   * Tạo mới khuyến mãi.
   * @param createPromotionDto Dữ liệu tạo mới khuyến mãi.
   * @returns Khuyến mãi đã được tạo.
   * @throws BadRequestException nếu dữ liệu không hợp lệ.
   */
  async createPromotion(createPromotionDto: CreatePromotionDto) {
    const errors = await validate(createPromotionDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    // Chỉ lưu dữ liệu nếu không có lỗi validation
    try {
      return await this.repository.create(createPromotionDto);
    } catch (error) {
      // Xử lý lỗi lưu dữ liệu (ví dụ: trùng tên)
      throw error;
    }
  }

  /**
   * Tìm khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @returns Khuyến mãi.
   * @throws NotFoundException nếu không tìm thấy khuyến mãi.
   */
  async findById(id: string) {
    checkValisIsObject(id, 'promotion id');
    const promotion = await this.repository.findOne(id);
    if (!promotion) {
      throw new NotFoundException('không tìm thấy khuyến mãi');
    }

    return promotion;
  }

  /**
   * Cập nhật thông tin khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @param promotionUpdate Dữ liệu cập nhật khuyến mãi.
   * @returns Khuyến mãi đã được cập nhật.
   * @throws BadRequestException nếu dữ liệu không hợp lệ.
   * @throws UnprocessableEntityException nếu có lỗi logic nghiệp vụ (ví dụ: trùng tên).
   */
  async updateById(id: string, promotionUpdate: UpdatePromotionDto) {
    const errors = await validate(promotionUpdate);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const { name, description, type, value, startDate, endDate, status } =
      promotionUpdate;

    const promotion = await this.findById(id); // Lấy thông tin promotion cũ

    try {
      return await this.repository.updateOne(id, promotion, {
        name,
        description,
        type,
        value,
        startDate,
        endDate,
        status,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
    }
  }

  /**
   * Xóa khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @returns Khuyến mãi đã bị xóa.
   * @throws NotFoundException nếu không tìm thấy khuyến mãi.
   */
  async deleteById(id: string) {
    const promotion = await this.findById(id); // Lấy thông tin promotion để kiểm tra tồn tại
    await this.repository.deleteOne(promotion._id.toHexString());
    return promotion;
  }

  /**
   * Cập nhật trạng thái của khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @param status Trạng thái mới.
   * @returns Khuyến mãi đã được cập nhật trạng thái.
   * @throws NotFoundException nếu không tìm thấy khuyến mãi.
   */
  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'promotion id');

    const promotion = await this.repository.updateStatusById(id, status);
    if (!promotion) {
      throw new NotFoundException('không tìm thấy id khuyến mãi');
    }

    return promotion;
  }

  /**
   * Lấy danh sách khuyến mãi có phân trang và tìm kiếm.
   * @param params Các tham số phân trang và tìm kiếm.
   * @returns Danh sách khuyến mãi đã phân trang.
   */
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';

    const promotions = await this.repository.findAll(page, limit, newSort, keyword);

    // Lấy tất cả promotions để tính total
    const allPromotions = await this.repository.findAll(1, 0, newSort, keyword);

    return buildPagination(allPromotions, params, promotions);
  }

  /**
   * Lấy danh sách tất cả khuyến mãi (chỉ lấy tên).
   * @returns Danh sách tất cả các khuyến mãi.
   */
  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}

