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
  import { CreateWarehouseDto } from './dto/create_warehouse.dto';
  import { UpdateWarehouseDto } from './dto/update_warehouse.dto';
  import { Warehouse } from 'src/warehouse/model/warehouse.schema';
  import { WarehouseService } from './warehouse.service';
  import { ParamPaginationDto } from 'src/common/param-pagination.dto';
  import { buildPagination } from 'src/common/common';
  
  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Controller('warehouse')
  export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) {}
  
    // @UseGuards(JwtAuthGuard, RoleAuthGuard)
    // @Roles(Role.ADMIN, Role.USER)
    @Get('all')
    getAllGetName() {
      return this.warehouseService.findAllGetName();
    }
  
    // @UseGuards(JwtAuthGuard, RoleAuthGuard)
    // @Roles(Role.ADMIN, Role.USER)
    @Get()
    async getAll(@Query() params: ParamPaginationDto) {
      const warehouses = await this.warehouseService.findAll(params);
      return buildPagination<Warehouse>(warehouses, params, warehouses);
    }
  
    // @UseGuards(JwtAuthGuard, RoleAuthGuard)
    // @Roles(Role.ADMIN)
    @Post('')
    async create(@Body() warehouse: CreateWarehouseDto) {
      const newWarehouse = await this.warehouseService.createWarehouse(warehouse);
      return {
        message: 'Tạo kho hàng thành công.',
        warehouse: newWarehouse,
      };
    }
  
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN)
    @Get(':id')
    getOne(@Param('id') id: string) {
      return this.warehouseService.findById(id);
    }
  
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN)
    @Patch(':id')
    async updateOne(@Param('id') id: string, @Body() warehouse: UpdateWarehouseDto) {
      const updatedWarehouse = await this.warehouseService.updateById(id, warehouse);
      return {
        message: `Cập nhật thông tin kho hàng thành công.`,
        updatedWarehouse,
      };
    }
  
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN)
    @Delete(':id')
    async deleteOne(@Param('id') id: string) {
      await this.warehouseService.deleteById(id);
      return {
        message: `Xóa kho hàng có ID thành công.`,
        deletedId: id,
      };
    }
  
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN, Role.USER)
    @Put(':id/status')
    async updateStatus(@Param('id') id: string, @Query('status') status: boolean) {
      const updatedStatus = await this.warehouseService.updateStatusById(id, status);
      return {
        message: `Cập nhật trạng thái kho hàng thành công.`,
        updatedStatus,
      };
    }
  }
  