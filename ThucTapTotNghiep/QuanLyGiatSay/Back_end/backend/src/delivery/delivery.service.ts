import { Injectable } from '@nestjs/common';
import { DeliveryRepository } from './delivery.repository';
import { UpdateDeliveryDto } from './dto/create_delivery.dto';
import { Delivery } from './model/delivery.schema';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

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
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';
  
    const delivery = await this.deliveryRepository.findAll(page, limit, newSort, keyword);
  
    // Lấy tất cả delivery để tính total
    const allDelivery = await this.deliveryRepository.findAll(1, 0, newSort, keyword);
  
    return buildPagination(allDelivery, params, delivery);
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
