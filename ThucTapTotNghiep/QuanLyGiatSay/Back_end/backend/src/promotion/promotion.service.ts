import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePromotionDto } from './dto/create_promotion.dto';
import { UpdatePromotionDto } from './dto/update_promotion.dto';
import { PromotionRepository } from './promotion.repository';
import { checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Injectable()
export class PromotionService {
  constructor(private readonly repository: PromotionRepository) {}

  async createPromotion(createPromotionDto: CreatePromotionDto) {
    const { ten_khuyenmai, mo_ta, loai_khuyenmai, gia_tri, ngay_bat_dau, ngay_ket_thuc, trangthai } =
      createPromotionDto;

    try {

      return await this.repository.create({
        ten_khuyenmai,
        mo_ta,
        loai_khuyenmai,
        gia_tri,
        ngay_bat_dau,
        ngay_ket_thuc,
        trangthai,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
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
    const { ten_khuyenmai, mo_ta, loai_khuyenmai, gia_tri, ngay_bat_dau, ngay_ket_thuc, trangthai } =
      promotionUpdate;

    const promotion = await this.findById(id);

    try {
      

      return await this.repository.updateOne(id, promotion, {
        ten_khuyenmai,
        mo_ta,
        loai_khuyenmai,
        gia_tri,
        ngay_bat_dau,
        ngay_ket_thuc,
        trangthai,
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

  findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;

    const newSort = sort != 'asc' ? 'desc' : 'asc';

    return this.repository.findAll(page, limit, newSort, keyword);
  }

  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}