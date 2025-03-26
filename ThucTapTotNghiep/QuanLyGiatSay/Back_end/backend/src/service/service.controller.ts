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
import { CreateServiceDto } from './dto/create_service.dto';
import { UpdateServiceDto } from './dto/update_service.dto';
import { Service } from 'src/service/model/service.schema';
import { ServiceService } from './service.service';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

// @UseGuards(JwtAuthGuard, RoleAuthGuard)
// @Roles(Role.ADMIN, Role.USER)
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get('all')
  getAllGetName() {
    return this.serviceService.findAllGetName();
  }

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const services = await this.serviceService.findAll(params);

    const rootServices = services.filter((service) => {
      return service.mo_ta === null;
    });

    return buildPagination<Service>(services, params, rootServices);
  }

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() service: CreateServiceDto) {
    const newService = await this.serviceService.createService(service);
    return {
      message: 'Tạo dịch vụ thành công.',
      service: newService,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.serviceService.findById(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() service: UpdateServiceDto) {
    const updatedService = await this.serviceService.updateById(id, service);
    return {
      message: `Cập nhật thông tin dịch vụ thành công.`,
      updatedService,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.serviceService.deleteById(id);
    return {
      message: `Xóa dịch vụ có ID thành công.`,
      deletedId: id,
    };
  }
}
