import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { ShelfService } from './shelf.service';
import { CreateShelfDto } from './dto/create_shelf.dto';
import { UpdateShelfDto } from './dto/update_shelf.dto';
import { Shelf } from './model/shelf.schema';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Controller('shelfs')
export class ShelfController {
  constructor(private readonly shelfService: ShelfService) {}

  // Lấy tất cả kệ đồ
  @Get()
  async getAll(@Query() query: ParamPaginationDto) {
    return this.shelfService.findAll(query);
  }

  // Lấy thông tin kệ đồ theo ID
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.shelfService.findById(id);
  }

  // Tạo mới Kệ đồ
  @Post()
  async create(@Body() createShelfDto: CreateShelfDto) {
    const newShelf = await this.shelfService.create(createShelfDto);
    return {
      message: 'Tạo kệ đồ thành công.',
      shelf: newShelf,
    };
  }

  // Cập nhật Kệ đồ
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShelfDto: UpdateShelfDto) {
    const updatedShelf = await this.shelfService.update(id, updateShelfDto);
    return {
      message: `Cập nhật kệ đồ thành công.`,
      updatedShelf,
    };
  }
}
