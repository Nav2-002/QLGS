import { Injectable, NotFoundException } from '@nestjs/common';
import { LaundryOrderRepository } from './laundry_order.repository';
import { CreateLaundryOrderDto } from './dto/create_laundry_order.dto';
import { UpdateLaundryOrderDto } from './dto/update_laundry_order.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

@Injectable()
export class LaundryOrderService {
  constructor(private readonly laundryOrderRepository: LaundryOrderRepository) {}

  // Tạo đơn hàng có kèm chi tiết (details nhúng trong DTO)
  async create(data: any): Promise<any> {
    try {
      console.log('📦 Dữ liệu chuẩn bị insert:', data);
      return await this.laundryOrderRepository.create(data);
    } catch (error) {
      console.error('❌ Lỗi khi tạo đơn hàng:', error);
      throw error;
    }
  }
  

  // Lấy 1 đơn hàng theo id
  async findOne(id: string) {
    const laundryOrder = await this.laundryOrderRepository.findOne(id);
    if (!laundryOrder) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
    return laundryOrder;
  }

  // Cập nhật đơn hàng (có thể bao gồm cả details nếu cần)
  async update(id: string, updateLaundryOrderDto: UpdateLaundryOrderDto) {
    const order = await this.findOne(id); // tận dụng findOne để check tồn tại
    return this.laundryOrderRepository.updateOne(id, order, updateLaundryOrderDto);
  }

  // Xóa đơn hàng
  async delete(id: string) {
    await this.findOne(id); // check tồn tại trước
    return this.laundryOrderRepository.deleteOne(id);
  }

  // Cập nhật trạng thái đơn hàng
  async updateStatus(id: string, status: boolean) {
    await this.findOne(id); // check tồn tại trước
    return this.laundryOrderRepository.updateStatusById(id, status);
  }

  // Lấy danh sách đơn hàng (phân trang, tìm kiếm)
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';
  
    const laundry_orders = await this.laundryOrderRepository.findAll(page, limit, newSort, keyword);
  
    // Lấy tất cả laundry_orders để tính total
    const allLaundry_orders = await this.laundryOrderRepository.findAll(1, 0, newSort, keyword);
  
    return buildPagination(allLaundry_orders, params, laundry_orders);
  }

  // Lấy toàn bộ danh sách tên đơn hàng (hoặc trường cần thiết)
  async findAllGetName() {
    return this.laundryOrderRepository.findAllGetName();
  }
}
