import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateGoodsDto } from './dto/create_goods.dto';      // DTO cho tạo mới Goods
import { UpdateGoodsDto } from './dto/update_goods.dto';      // DTO cho cập nhật Goods
import { Goods, GoodsDocument } from './model/goods.schema';        // Model và Document interface của Goods

@Injectable()
export class GoodsRepository {
  constructor(@InjectModel(Goods.name) private readonly model: Model<GoodsDocument>) {}

  /**
   * Tạo mới Goods.
   */
  async create(goods: CreateGoodsDto) {
    const newGoods = new this.model({
      _id: new Types.ObjectId(),
      ...goods,
    });

    return await newGoods.save();
  }

  /**
   * Tìm Goods theo ID.
   */
  async findOne(id: string) {
    return await this.model
      .findOne({ _id: id })
      .lean<Goods>(true);
  }

  /**
   * Cập nhật thông tin Goods theo ID.
   */
  async updateOne(id: string, goodsOld: Goods, goodsNew: UpdateGoodsDto) {
    const updateGoods = await this.model.findOneAndUpdate({ _id: id }, goodsNew, {
      new: true,
    });

    if (!updateGoods) {
      throw new Error('Không tìm thấy hàng hóa để cập nhật.');
    }

    return updateGoods;
  }

  /**
   * Xóa Goods theo ID.
   */
  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  /**
   * Cập nhật trạng thái của Goods theo ID.
   */
  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { new: true })
      .lean<Goods>(true);
  }

  /**
   * Tìm tất cả Goods có phân trang, sắp xếp và tìm kiếm theo từ khóa.
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
      .lean<Goods[]>(true);
  }

  /**
   * Lấy danh sách tất cả Goods (chỉ lấy tên).
   */
  async findAllGetName() {
    return await this.model.find().select('name').lean<Goods[]>(true);
  }
}
