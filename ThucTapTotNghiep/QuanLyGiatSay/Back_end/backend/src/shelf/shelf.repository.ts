import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shelf, ShelfDocument } from './model/shelf.schema';

@Injectable()
export class ShelfRepository {
  constructor(
    @InjectModel(Shelf.name) private readonly shelfModel: Model<ShelfDocument>,
  ) {}

  // Tạo kệ đồ
  async create(createShelfDto: any): Promise<ShelfDocument> {
    const newShelf = new this.shelfModel(createShelfDto);
    return newShelf.save();
  }

  // Cập nhật kệ đồ
  async update(id: string, updateShelfDto: any): Promise<ShelfDocument | null> {
    return this.shelfModel.findByIdAndUpdate(id, updateShelfDto, { new: true });
  }

  // Lấy tất cả kệ đồ
  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.shelfModel
      .find(keyword ? { $or: [{ location: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ location: sort })
      .limit(limit)
      .lean<Shelf[]>(true);
  }
  // Lấy kệ đồ theo ID
  async findById(id: string): Promise<ShelfDocument | null> {
    return this.shelfModel.findById(id).exec();
  }

  // Xóa kệ đồ theo ID
  async delete(id: string): Promise<ShelfDocument | null> {
    return this.shelfModel.findByIdAndDelete(id).exec();
  }
}
