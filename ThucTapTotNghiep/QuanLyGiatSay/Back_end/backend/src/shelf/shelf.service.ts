import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Shelf } from './model/shelf.schema';
import { CreateShelfDto } from './dto/create_shelf.dto';
import { UpdateShelfDto } from './dto/update_shelf.dto';

@Injectable()
export class ShelfService {
  constructor(
    @InjectModel(Shelf.name) private readonly shelfModel: Model<Shelf>,
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
  async findAll(): Promise<Shelf[]> {
    return this.shelfModel.find().exec();
  }
}
