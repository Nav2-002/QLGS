import { Injectable, NotFoundException } from '@nestjs/common';
import { GoodsRepository } from './goods.repository';        // Repository Goods
import { CreateGoodsDto } from './dto/create_goods.dto';      // DTO cho tạo mới Goods
import { UpdateGoodsDto } from './dto/update_goods.dto';      // DTO cho cập nhật Goods
import { ParamPaginationDto } from 'src/common/param-pagination.dto'; // DTO cho phân trang
import { buildPagination } from 'src/common/common';            // Hàm tiện ích phân trang

@Injectable()
export class GoodsService {
  constructor(private readonly goodsRepository: GoodsRepository) {}

  /**
   * Tạo mới Goods.
   */
  async create(createGoodsDto: CreateGoodsDto) {
    return await this.goodsRepository.create(createGoodsDto);
  }

  /**
   * Lấy thông tin Goods theo ID.
   * Nếu không tìm thấy, ném lỗi NotFoundException.
   */
  async findOne(id: string) {
    const goods = await this.goodsRepository.findOne(id);
    if (!goods) {
      throw new NotFoundException('Không tìm thấy hàng hóa');
    }
    return goods;
  }

  /**
   * Cập nhật thông tin Goods theo ID.
   * Nếu không tìm thấy Goods cũ, ném lỗi NotFoundException.
   * Nếu cập nhật thất bại, ném lỗi NotFoundException.
   */
  async update(id: string, updateGoodsDto: UpdateGoodsDto) {
    const goodsOld = await this.goodsRepository.findOne(id);
    if (!goodsOld) {
      throw new NotFoundException('Không tìm thấy hàng hóa để cập nhật');
    }

    const updatedGoods = await this.goodsRepository.updateOne(
      id,
      goodsOld,
      updateGoodsDto,
    );

    if (!updatedGoods) {
      throw new NotFoundException('Cập nhật hàng hóa thất bại');
    }

    return updatedGoods;
  }

  /**
   * Xóa Goods theo ID.
   * Nếu không tìm thấy Goods để xóa, ném lỗi NotFoundException.
   */
  async delete(id: string) {
    const goods = await this.goodsRepository.findOne(id);
    if (!goods) {
      throw new NotFoundException('Không tìm thấy hàng hóa để xóa');
    }
    return await this.goodsRepository.deleteOne(id);
  }

  /**
   * Cập nhật trạng thái của Goods theo ID.
   * Nếu không tìm thấy Goods để cập nhật trạng thái, ném lỗi NotFoundException.
   */
  async updateStatus(id: string, status: boolean) {
    const goods = await this.goodsRepository.findOne(id);
    if (!goods) {
      throw new NotFoundException('Không tìm thấy hàng hóa để cập nhật trạng thái');
    }
    return await this.goodsRepository.updateStatusById(id, status);
  }

  /**
   * Lấy danh sách Goods có phân trang và tìm kiếm.
   * Sử dụng hàm buildPagination để tạo kết quả trả về.
   */
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';

    const goods = await this.goodsRepository.findAll(page, limit, newSort, keyword);

    // Lấy tất cả promotions để tính total ->  Đổi thành lấy tất cả goods
    const allGoods = await this.goodsRepository.findAll(1, 0, newSort, keyword);

    return buildPagination(allGoods, params, goods);
  }

  /**
   * Lấy danh sách tất cả Goods (chỉ lấy tên).
   */
  async findAllGetName() {
    return await this.goodsRepository.findAllGetName();
  }
}
