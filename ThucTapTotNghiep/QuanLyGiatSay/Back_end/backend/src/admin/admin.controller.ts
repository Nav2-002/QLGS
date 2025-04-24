import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
// import { Roles } from 'src/auth/decorator/role.decorator';
// import { Role } from 'src/auth/decorator/role.enum';
// import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
// import { RoleAuthGuard } from 'src/auth/guards/role-jwt.guard';
import { CreateAdminDto } from './dto/create_admin.dto';
import { UpdateAdminDto } from './dto/update_admin.dto';
import { Admin } from 'src/admin/model/admin.schema';
import { AdminService } from './admin.service';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';
import { Customer } from 'src/customer/model/customer.schema';
import { CreateCustomerDto } from 'src/customer/dto/create_customer.dto';
import { UpdateCustomerDto } from 'src/customer/dto/update_customer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

// @UseGuards(JwtAuthGuard, RoleAuthGuard)
// @Roles(Role.ADMIN, Role.USER)
@Controller('admins')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    const { _id } = req.user;
    return this.adminService.getOne(_id);
  }
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get('all')
  getAllGetName() {
    return this.adminService.findAllGetName();
  }

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() query: ParamPaginationDto) {
    return this.adminService.findAll(query);
  }
  

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() admin: CreateAdminDto) {
    const newAdmin = await this.adminService.createAdmin(admin);
    return {
      message: 'Tạo admin thành công.',
        admin: newAdmin,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Get(':id')
  getbyId(@Param('id') id: string) {
    return this.adminService.findById(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() admin: UpdateAdminDto) {
    const updatedAdmin = await this.adminService.updateById(id, admin);
    return {
      message: `Cập nhật thông tin admin thành công.`,
      updatedAdmin,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.adminService.deleteById(id);
    return {
      message: `Xóa admin có ID thành công.`,
      deletedId: id,
    };
  }

}