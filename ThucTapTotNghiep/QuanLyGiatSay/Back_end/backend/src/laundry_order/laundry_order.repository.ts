import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLaundryOrderDto } from './dto/create_laundry_order.dto';      // DTO cho tạo mới đơn hàng giặt ủi
import { UpdateLaundryOrderDto } from './dto/update_laundry_order.dto';      // DTO cho cập nhật đơn hàng giặt ủi
import {
  LaundryOrder,
  LaundryOrderDocument,
} from './model/laundry_order.schema';        // Model và Document interface của đơn hàng giặt ủi

@Injectable()
export class LaundryOrderRepository {
  constructor(
    @InjectModel(LaundryOrder.name)
    private readonly model: Model<LaundryOrderDocument>,
  ) {}

  /**
   * Tạo mới đơn hàng giặt ủi.
   * @param dto Dữ liệu tạo mới (bao gồm cả chi tiết đơn hàng).
   * @returns Đơn hàng giặt ủi đã tạo.
   */
  async create(dto: CreateLaundryOrderDto): Promise<LaundryOrder> {
    const newOrder = new this.model(dto); // dto đã có cả `details`
    return await newOrder.save();
  }

  /**
   * Tìm đơn hàng giặt ủi theo ID.
   * @param id ID của đơn hàng.
   * @returns Đơn hàng giặt ủi hoặc null nếu không tìm thấy.
   */
  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<LaundryOrder>(true);
  }

  /**
   * Cập nhật thông tin đơn hàng giặt ủi theo ID.
   * @param id ID của đơn hàng.
   * @param laundryOrderOld Thông tin đơn hàng cũ.
   * @param laundryOrderNew Thông tin đơn hàng mới.
   * @returns Đơn hàng giặt ủi đã cập nhật.
   * @throws Error nếu không tìm thấy đơn hàng để cập nhật.
   */
  async updateOne(
    id: string,
    laundryOrderOld: LaundryOrder,
    laundryOrderNew: UpdateLaundryOrderDto,
  ) {
    const updateLaundryOrder = await this.model.findOneAndUpdate(
      { _id: id },
      laundryOrderNew,
      {
        new: true,
      },
    );

    if (!updateLaundryOrder) {
      throw new Error('Không tìm thấy đơn hàng để cập nhật.');
    }

    return updateLaundryOrder;
  }

  /**
   * Xóa đơn hàng giặt ủi theo ID.
   * @param id ID của đơn hàng.
   * @returns Kết quả của thao tác xóa.
   */
  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  /**
   * Cập nhật trạng thái của đơn hàng giặt ủi theo ID.
   * @param id ID của đơn hàng.
   * @param status Trạng thái mới.
   * @returns Đơn hàng giặt ủi đã cập nhật trạng thái.
   */
  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { trangthai: status }, { new: true })
      .lean<LaundryOrder>(true);
  }

  /**
   * Tìm tất cả đơn hàng giặt ủi có phân trang, sắp xếp và tìm kiếm theo từ khóa.
   * @param page Số trang.
   * @param limit Số lượng kết quả trên mỗi trang.
   * @param sort Thứ tự sắp xếp ('asc' hoặc 'desc').
   * @param keyword Từ khóa tìm kiếm (trong trường 'name').
   * @returns Mảng các đơn hàng giặt ủi.
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
      .lean<LaundryOrder[]>(true);
  }

  /**
   * Lấy danh sách tất cả đơn hàng giặt ủi (chỉ lấy trạng thái và ngày nhận).
   * @returns Mảng các đơn hàng giặt ủi với trạng thái và ngày nhận.
   */
  async findAllGetName() {
    return await this.model
      .find()
      .select('status receivedDate')
      .lean<LaundryOrder[]>(true);
  }
}
