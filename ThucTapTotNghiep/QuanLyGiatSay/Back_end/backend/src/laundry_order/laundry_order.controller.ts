import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateLaundryOrderDto } from './dto/create_laundry_order.dto';
import { UpdateLaundryOrderDto } from './dto/update_laundry_order.dto';
import { LaundryOrder } from './model/laundry_order.schema';
import { LaundryOrderService } from './laundry_order.service';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

@Controller('laundry_orders')
export class LaundryOrderController {
  constructor(private readonly laundryOrderService: LaundryOrderService) {}

  // ✅ Lấy tất cả tên đơn hàng
  @Get('names')
  getAllGetName() {
    return this.laundryOrderService.findAllGetName();
  }

  // ✅ Lấy danh sách có phân trang + tìm kiếm
  @Get()
  async getAll(@Query() query: ParamPaginationDto) {
    return this.laundryOrderService.findAll(query);
  }
  

  // ✅ Tạo đơn hàng mới
  @Post()
  async create(@Body() body: any) {
    console.log('📥 Body nhận được:', body);
    return this.laundryOrderService.create(body);
  }
  

  // ✅ Lấy chi tiết theo ID
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.laundryOrderService.findOne(id);
  }

  // ✅ Cập nhật đơn hàng
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() laundryOrder: UpdateLaundryOrderDto) {
    const updatedLaundryOrder = await this.laundryOrderService.update(id, laundryOrder);
    return {
      message: `Cập nhật thông tin đơn hàng thành công.`,
      updatedLaundryOrder,
    };
  }

  // ✅ Cập nhật trạng thái đơn hàng (dùng route riêng)
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Query('status') status: boolean) {
    const updatedStatus = await this.laundryOrderService.updateStatus(id, status);
    return {
      message: `Cập nhật trạng thái đơn hàng thành công.`,
      updatedStatus,
    };
  }

  // ✅ Xóa đơn hàng
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.laundryOrderService.delete(id);
    return {
      message: `Xóa đơn hàng có ID thành công.`,
      deletedId: id,
    };
  }
}
