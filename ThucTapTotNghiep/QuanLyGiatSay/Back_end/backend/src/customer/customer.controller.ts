import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
// import { Roles } from 'src/auth/decorator/role.decorator';
// import { Role } from 'src/auth/decorator/role.enum';
// import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
// import { RoleAuthGuard } from 'src/auth/guards/role-jwt.guard';
import { CreateCustomerDto } from './dto/create_customer.dto';      // DTO cho tạo mới Customer
import { UpdateCustomerDto } from './dto/update_customer.dto';      // DTO cho cập nhật Customer
import { Customer } from 'src/customer/model/customer.schema';        // Model Customer
import { CustomerService } from './customer.service';              // Service Customer
import { ParamPaginationDto } from 'src/common/param-pagination.dto'; // DTO cho phân trang
import { buildPagination } from 'src/common/common';            // Hàm tiện ích phân trang

// @UseGuards(JwtAuthGuard, RoleAuthGuard)
// @Roles(Role.ADMIN, Role.USER)
@Controller('customers') // Controller quản lý Customer
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * Lấy danh sách tên tất cả Customer.
   */
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get('all')
  getAllGetName() {
    return this.customerService.findAllGetName();
  }

  /**
   * Lấy danh sách Customer có phân trang.
   */
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const customers = await this.customerService.findAll(params);

    return buildPagination<Customer>(customers, params, customers);
  }

  /**
   * Tạo mới Customer.
   */
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() customer: CreateCustomerDto) {
    const newCustomer = await this.customerService.createCustomer(customer);
    return {
      message: 'Tạo khách hàng thành công.',
      customer: newCustomer,
    };
  }

  /**
   * Lấy thông tin Customer theo ID.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.customerService.findById(id);
  }

  /**
   * Cập nhật thông tin Customer theo ID.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() customer: UpdateCustomerDto) {
    const updatedCustomer = await this.customerService.updateById(id, customer);
    return {
      message: `Cập nhật thông tin khách hàng thành công.`,
      updatedCustomer,
    };
  }

  /**
   * Xóa Customer theo ID.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.customerService.deleteById(id);
    return {
      message: `Xóa khách hàng có ID thành công.`,
      deletedId: id,
    };
  }
}
