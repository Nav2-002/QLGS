import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLaundryOrderDto } from './dto/create_laundry_order.dto';
import { UpdateLaundryOrderDto } from './dto/update_laundry_order.dto';
import {
  LaundryOrder,
  LaundryOrderDocument,
} from './model/laundry_order.schema';

@Injectable()
export class LaundryOrderRepository {
  constructor(
    @InjectModel(LaundryOrder.name)
    private readonly model: Model<LaundryOrderDocument>,
  ) {}

  async create(dto: CreateLaundryOrderDto): Promise<LaundryOrder> {
    const newOrder = new this.model(dto); // dto đã có cả `details`
    return await newOrder.save();
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<LaundryOrder>(true);
  }

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

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { trangthai: status }, { new: true })
      .lean<LaundryOrder>(true);
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword?: string,
  ) {
    const filter = keyword
      ? { 'details.ghichu': { $regex: keyword, $options: 'i' } } // ví dụ tìm theo ghi chú
      : {};

    return await this.model
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ ngay_nhan: sort === 'asc' ? 1 : -1 }) // đổi trường sort cho hợp lý
      .lean<LaundryOrder[]>(true);
  }

  async findAllGetName() {
    return await this.model
      .find()
      .select('trangthai ngay_nhan')
      .lean<LaundryOrder[]>(true);
  }
}
