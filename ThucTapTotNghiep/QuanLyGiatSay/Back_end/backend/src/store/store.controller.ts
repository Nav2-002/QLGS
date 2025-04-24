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
import { CreateStoreDto } from './dto/create_store.dto';      
import { UpdateStoreDto } from './dto/update_store.dto';     
import { Store } from 'src/store/model/store.schema';        
import { StoreService } from './store.service';         
import { ParamPaginationDto } from 'src/common/param-pagination.dto';  
import { buildPagination } from 'src/common/common';            

// @UseGuards(JwtAuthGuard, RoleAuthGuard)
// @Roles(Role.ADMIN, Role.USER)
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  /**
   * Lấy danh sách tất cả các cửa hàng (chỉ lấy tên).
   * @returns Danh sách tên của tất cả các cửa hàng.
   */
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get('all')
  getAllGetName() {
    return this.storeService.findAllGetName();
  }

  /**
   * Lấy danh sách các cửa hàng có phân trang.
   * @param query Các tham số phân trang.
   * @returns Danh sách các cửa hàng đã phân trang.
   */
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() query: ParamPaginationDto) {
    return this.storeService.findAll(query);
  }

  /**
   * Tạo mới một cửa hàng.
   * @param store Dữ liệu tạo mới cửa hàng.
   * @returns Thông tin cửa hàng đã được tạo.
   */
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() store: CreateStoreDto) {
    const newStore = await this.storeService.createStore(store);
    return {
      message: 'Tạo cửa hàng thành công.',
      store: newStore,
    };
  }

  /**
   * Lấy thông tin một cửa hàng theo ID.
   * @param id ID của cửa hàng cần lấy.
   * @returns Thông tin của cửa hàng.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.storeService.findById(id);
  }

  /**
   * Cập nhật thông tin của một cửa hàng theo ID.
   * @param id ID của cửa hàng cần cập nhật.
   * @param store Dữ liệu cập nhật cửa hàng.
   * @returns Thông tin cửa hàng sau khi cập nhật.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() store: UpdateStoreDto) {
    const updatedStore = await this.storeService.updateById(id, store);
    return {
      message: `Cập nhật thông tin cửa hàng thành công.`,
      updatedStore,
    };
  }

  /**
   * Xóa một cửa hàng theo ID.
   * @param id ID của cửa hàng cần xóa.
   * @returns Thông báo xóa thành công và ID của cửa hàng đã xóa.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.storeService.deleteById(id);
    return {
      message: `Xóa cửa hàng có ID thành công.`,
      deletedId: id,
    };
  }

  /**
   * Cập nhật trạng thái của một cửa hàng theo ID.
   * @param id ID của cửa hàng cần cập nhật trạng thái.
   * @param status Trạng thái mới của cửa hàng (true hoặc false).
   * @returns Thông tin cửa hàng sau khi cập nhật trạng thái.
   */
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Query('status') status: boolean) {
    const updatedStatus = await this.storeService.updateStatusById(id, status);
    return {
      message: `Cập nhật trạng thái cửa hàng thành công.`,
      updatedStatus,
    };
  }
}

