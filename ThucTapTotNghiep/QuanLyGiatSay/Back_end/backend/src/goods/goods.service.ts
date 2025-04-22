import { Injectable, NotFoundException } from '@nestjs/common';
import { GoodsRepository } from './goods.repository';
import { CreateGoodsDto } from './dto/create_goods.dto';
import { UpdateGoodsDto } from './dto/update_goods.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

@Injectable()
export class GoodsService {
  constructor(private readonly goodsRepository: GoodsRepository) {}

  // Tạo hàng hóa
  async create(createGoodsDto: CreateGoodsDto) {
    return await this.goodsRepository.create(createGoodsDto);
  }

  // Lấy 1 hàng hóa theo id
  async findOne(id: string) {
    const goods = await this.goodsRepository.findOne(id);
    if (!goods) {
      throw new NotFoundException('Không tìm thấy hàng hóa');
    }
    return goods;
  }

  // Cập nhật hàng hóa
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

  // Xóa hàng hóa
  async delete(id: string) {
    const goods = await this.goodsRepository.findOne(id);
    if (!goods) {
      throw new NotFoundException('Không tìm thấy hàng hóa để xóa');
    }
    return await this.goodsRepository.deleteOne(id);
  }

  // Cập nhật trạng thái
  async updateStatus(id: string, status: boolean) {
    const goods = await this.goodsRepository.findOne(id);
    if (!goods) {
      throw new NotFoundException('Không tìm thấy hàng hóa để cập nhật trạng thái');
    }
    return await this.goodsRepository.updateStatusById(id, status);
  }

  // Lấy danh sách có phân trang và tìm kiếm
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';
  
    const goods = await this.goodsRepository.findAll(page, limit, newSort, keyword);
  
    // Lấy tất cả promotions để tính total
    const allGoods = await this.goodsRepository.findAll(1, 0, newSort, keyword);
  
    return buildPagination(allGoods, params, goods);
  }

  // Lấy toàn bộ danh sách (chỉ tên)
  async findAllGetName() {
    return await this.goodsRepository.findAllGetName();
  }
}
