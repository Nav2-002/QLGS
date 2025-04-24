import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateStoreDto } from './dto/create_store.dto';
import { UpdateStoreDto } from './dto/update_store.dto';
import { Store } from 'src/store/model/store.schema';

@Injectable()
export class StoreRepository {
  constructor(@InjectModel(Store.name) private readonly model: Model<Store>) {}

  /**
   * Tạo mới một cửa hàng.
   * @param store Dữ liệu tạo mới cửa hàng.
   * @returns Cửa hàng đã được tạo.
   */
  async create(store: CreateStoreDto) {
    const newStore = await new this.model({
      _id: new Types.ObjectId(),
      ...store,
    }).save();

    return newStore;
  }

  /**
   * Tìm một cửa hàng theo ID.
   * @param id ID của cửa hàng cần tìm.
   * @returns Cửa hàng nếu tìm thấy, null nếu không tìm thấy.
   */
  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Store>(true);
  }

  /**
   * Cập nhật thông tin của một cửa hàng.
   * @param id ID của cửa hàng cần cập nhật.
   * @param storeOld Thông tin cũ của cửa hàng.
   * @param storeNew Thông tin mới của cửa hàng.
   * @returns Cửa hàng đã được cập nhật, null nếu không tìm thấy.
   */
  async updateOne(id: string, storeOld: Store, storeNew: UpdateStoreDto) {
    const updateStore = await this.model.findOneAndUpdate(
      { _id: id },
      storeNew,
      {
        new: true,
      },
    );

    return updateStore;
  }

  /**
   * Xóa một cửa hàng theo ID.
   * @param id ID của cửa hàng cần xóa.
   * @returns Cửa hàng đã bị xóa, null nếu không tìm thấy.
   */
  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  /**
   * Cập nhật trạng thái của một cửa hàng theo ID.
   * @param id ID của cửa hàng cần cập nhật.
   * @param status Trạng thái mới của cửa hàng.
   * @returns Cửa hàng đã được cập nhật trạng thái, null nếu không tìm thấy.
   */
  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { trangthai: status }, { new: true })
      .lean<Store>(true);
  }

  /**
   * Tìm nhiều cửa hàng dựa trên các tham số phân trang và tìm kiếm.
   * @param page Số trang.
   * @param limit Số lượng cửa hàng trên mỗi trang.
   * @param sort Thứ tự sắp xếp (asc hoặc desc).
   * @param keyword Từ khóa tìm kiếm (tìm kiếm theo tên).
   * @returns Mảng các cửa hàng thỏa mãn các điều kiện đã cho.
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
      .lean<Store[]>(true);
  }

  /**
   * Lấy tất cả các cửa hàng (chỉ lấy tên).
   * @returns Mảng các cửa hàng với thông tin tên.
   */
  async findAllGetName() {
    return await this.model.find().lean<Store[]>(true);
  }
}

