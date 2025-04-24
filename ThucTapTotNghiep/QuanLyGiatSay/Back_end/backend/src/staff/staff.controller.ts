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
  Request
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create_staff.dto';
import { UpdateStaffDto } from './dto/update_staff.dto';
import { Staff } from 'src/staff/model/staff.schema';
import { StaffService } from './staff.service';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

// @UseGuards(JwtAuthGuard, RoleAuthGuard)
// @Roles(Role.ADMIN, Role.USER)
@Controller('staffs')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  /**
   * Lấy thông tin của nhân viên đang đăng nhập.
   * @param req Request object chứa thông tin user từ JWT.
   * @returns Thông tin của nhân viên đang đăng nhập.
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    const { _id } = req.user;
    return this.staffService.getOne(_id);
  }
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get('all')
  getAllGetName() {
    return this.staffService.findAllGetName();
  }

  /**
   * Lấy danh sách nhân viên có phân trang.
   * @param params Các tham số phân trang.
   * @returns Danh sách nhân viên đã phân trang.
   */
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const staffs = await this.staffService.findAll(params);

    // Logic lọc 'rootStaffs' có vẻ không phù hợp với schema mới.
    // 'id_store' là required, nên không có staff nào có 'id_store' là null.
    // Nếu bạn có một khái niệm khác về "root staff", hãy điều chỉnh logic lọc.
    // Ví dụ: lọc theo một role cụ thể.
    // const rootStaffs = staffs.filter((staff) => staff.role === 'ROOT');

    return buildPagination<Staff>(staffs, params, staffs); // Trả về tất cả staffs hoặc logic lọc đã điều chỉnh
  }

  /**
   * Tạo mới nhân viên.
   * @param staff Dữ liệu tạo mới nhân viên.
   * @returns Thông tin nhân viên đã tạo.
   */
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() staff: CreateStaffDto) {
    const newStaff = await this.staffService.createStaff(staff);
    return {
      message: 'Tạo nhân viên thành công.',
      staff: newStaff,
    };
  }

  /**
   * Lấy thông tin nhân viên theo ID.
   * @param id ID của nhân viên.
   * @returns Thông tin nhân viên.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Get(':id')
  getbyId(@Param('id') id: string) {
    return this.staffService.findById(id);
  }

  /**
   * Cập nhật thông tin nhân viên theo ID.
   * @param id ID của nhân viên.
   * @param staff Dữ liệu cập nhật nhân viên.
   * @returns Thông tin nhân viên đã cập nhật.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() staff: UpdateStaffDto) {
    const updatedStaff = await this.staffService.updateById(id, staff);
    return {
      message: `Cập nhật thông tin nhân viên thành công.`,
      updatedStaff,
    };
  }

  /**
   * Xóa nhân viên theo ID.
   * @param id ID của nhân viên.
   * @returns Thông báo xóa thành công.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.staffService.deleteById(id);
    return {
      message: `Xóa nhân viên có ID thành công.`,
      deletedId: id,
    };
  }

  /**
   * Cập nhật trạng thái của nhân viên theo ID.
   * @param id ID của nhân viên.
   * @param status Trạng thái mới của nhân viên.
   * @returns Thông tin nhân viên đã cập nhật trạng thái.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: boolean,
  ) {
    const updatedStatus = await this.staffService.updateStatusById(id, status);
    return {
      message: `Cập nhật trạng thái nhân viên thành công.`,
      updatedStatus,
    };
  }
}

