import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Shelf } from './model/shelf.schema';
import { CreateShelfDto } from './dto/create_shelf.dto';
import { UpdateShelfDto } from './dto/update_shelf.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { ShelfRepository } from './shelf.repository';
import { buildPagination } from 'src/common/common';

@Injectable()
export class ShelfService {
  constructor(
    @InjectModel(Shelf.name) private readonly shelfModel: Model<Shelf>,
    readonly repository: ShelfRepository
  ) {}

  // Tạo mới Kệ đồ
  async create(createShelfDto: CreateShelfDto): Promise<Shelf> {
    const newShelf = new this.shelfModel(createShelfDto);
    return newShelf.save();
  }

  // Cập nhật Kệ đồ
  async update(id: string, updateShelfDto: UpdateShelfDto): Promise<Shelf> {
    const updated = await this.shelfModel.findByIdAndUpdate(id, updateShelfDto, { new: true });
    if (!updated) throw new NotFoundException('Shelf not found');
    return updated;
  }

  // Lấy thông tin kệ đồ theo ID
  async findById(id: string): Promise<Shelf | null> {
    return this.shelfModel.findById(id).exec();
  }

  // Lấy tất cả kệ đồ
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';
  
    // Gọi repository.findAll thay vì gọi lại this.findAll
    const shelfs = await this.repository.findAll(page, limit, newSort, keyword);
  
    // Lấy tất cả shelfs để tính tổng số (nếu cần)
    const allShelfs = await this.repository.findAll(1, 0, newSort, keyword);
  
    return buildPagination(allShelfs, params, shelfs);
  }
}
