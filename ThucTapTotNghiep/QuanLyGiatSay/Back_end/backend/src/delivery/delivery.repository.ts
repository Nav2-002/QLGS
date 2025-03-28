import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delivery } from './model/delivery.schema';
import { UpdateDeliveryDto } from './dto/create_delivery.dto';

@Injectable()
export class DeliveryRepository {
  constructor(
    @InjectModel(Delivery.name) private readonly deliveryModel: Model<Delivery>,
  ) {}

  // Tạo mới giao hàng
  async create(createDeliveryDto: UpdateDeliveryDto): Promise<Delivery> {
    const newDelivery = new this.deliveryModel(createDeliveryDto);
    return newDelivery.save();
  }

  // Cập nhật giao hàng
  async update(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery> {
    const updated = await this.deliveryModel.findByIdAndUpdate(id, updateDeliveryDto, { new: true });
    if (!updated) throw new NotFoundException('Delivery not found');
    return updated;
  }

  // Tìm giao hàng theo ID
  async findById(id: string): Promise<Delivery | null> {
    return this.deliveryModel.findById(id).exec();
  }

  // Tìm tất cả giao hàng với phân trang
  async findAll(page: number, limit: number, sort: 'asc' | 'desc', keyword?: string): Promise<Delivery[]> {
    const query = keyword ? { delivery_address: new RegExp(keyword, 'i') } : {};
    return this.deliveryModel
      .find(query)
      .sort({ _id: sort === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  // Xóa giao hàng
  async remove(id: string): Promise<Delivery> {
    const deleted = await this.deliveryModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Delivery not found');
    return deleted;
  }

  // Cập nhật trạng thái giao hàng
  async updateStatus(id: string, status: boolean): Promise<Delivery> {
    const updated = await this.deliveryModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) throw new NotFoundException('Delivery not found');
    return updated;
  }
}
