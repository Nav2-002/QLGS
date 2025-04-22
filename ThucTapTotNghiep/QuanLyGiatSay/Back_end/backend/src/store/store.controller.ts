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

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get('all')
  getAllGetName() {
    return this.storeService.findAllGetName();
  }

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() query: ParamPaginationDto) {
    return this.storeService.findAll(query);
  }

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

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.storeService.findById(id);
  }

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
