import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePromotionDto } from './dto/create_promotion.dto';
import { UpdatePromotionDto } from './dto/update_promotion.dto';
import { PromotionRepository } from './promotion.repository';
import { buildPagination, checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { validate } from 'class-validator';

@Injectable()
export class PromotionService {
  constructor(private readonly repository: PromotionRepository) {}

  async createPromotion(createPromotionDto: CreatePromotionDto) {
    const errors = await validate(createPromotionDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  
    // Chỉ lưu dữ liệu nếu không có lỗi validation
    try {
      return await this.repository.create(createPromotionDto);
    } catch (error) {
      // Xử lý lỗi lưu dữ liệu
      throw error;
    }
  }

  async findById(id: string) {
    checkValisIsObject(id, 'promotion id');
    const promotion = await this.repository.findOne(id);
    if (!promotion) {
      throw new NotFoundException('không tìm thấy khuyến mãi');
    }

    return promotion;
  }

  async updateById(id: string, promotionUpdate: UpdatePromotionDto) {
    const errors = await validate(promotionUpdate);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const { name, description, type, value, startDate, endDate, status } =
      promotionUpdate;

    const promotion = await this.findById(id);

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


  async deleteById(id: string) {
    const promotion = await this.findById(id);

    await this.repository.deleteOne(promotion._id.toHexString());

    return promotion;
  }

  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'promotion id');

    const promotion = await this.repository.updateStatusById(id, status);
    if (!promotion) {
      throw new NotFoundException('không tìm thấy id khuyến mãi');
    }

    return promotion;
  }

  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';
  
    const promotions = await this.repository.findAll(page, limit, newSort, keyword);
  
    // Lấy tất cả promotions để tính total
    const allPromotions = await this.repository.findAll(1, 0, newSort, keyword);
  
    return buildPagination(allPromotions, params, promotions);
  }


  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}
