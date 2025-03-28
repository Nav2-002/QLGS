import { Injectable } from '@nestjs/common';
import { DeliveryRepository } from './delivery.repository';
import { UpdateDeliveryDto } from './dto/create_delivery.dto';
import { Delivery } from './model/delivery.schema';

@Injectable()
export class DeliveryService {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}

  // Tạo mới giao hàng
  async create(createDeliveryDto: UpdateDeliveryDto): Promise<Delivery> {
    return this.deliveryRepository.create(createDeliveryDto);
  }

  // Cập nhật giao hàng
  async update(id: string, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery> {
    return this.deliveryRepository.update(id, updateDeliveryDto);
  }

  // Tìm giao hàng theo ID
  async findById(id: string): Promise<Delivery | null> {
    return this.deliveryRepository.findById(id);
  }

  // Tìm tất cả giao hàng
  async findAll(page: number, limit: number, sort: 'asc' | 'desc', keyword?: string): Promise<Delivery[]> {
    return this.deliveryRepository.findAll(page, limit, sort, keyword);
  }

  // Xóa giao hàng theo ID
  async remove(id: string): Promise<Delivery> {
    return this.deliveryRepository.remove(id);
  }

  // Cập nhật trạng thái giao hàng
  async updateStatus(id: string, status: boolean): Promise<Delivery> {
    return this.deliveryRepository.updateStatus(id, status);
  }
}
