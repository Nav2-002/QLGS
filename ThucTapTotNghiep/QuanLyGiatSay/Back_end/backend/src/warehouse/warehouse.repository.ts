import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateWarehouseDto } from './dto/create_warehouse.dto';
import { UpdateWarehouseDto } from './dto/update_warehouse.dto';
import { Warehouse } from 'src/warehouse/model/warehouse.schema';

@Injectable()
export class WarehouseRepository {
  constructor(@InjectModel(Warehouse.name) private readonly model: Model<Warehouse>) {}

  async create(warehouse: CreateWarehouseDto) {
    const newWarehouse = await new this.model({
      _id: new Types.ObjectId(),
      ...warehouse,
    }).save();

    return newWarehouse;
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Warehouse>(true);
  }

  async updateOne(id: string, warehouseOld: Warehouse, warehouseNew: UpdateWarehouseDto) {
    const updatedWarehouse = await this.model.findOneAndUpdate(
      { _id: id },
      warehouseNew,
      { new: true },
    );
    return updatedWarehouse;
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { status: status }, { new: true })
      .lean<Warehouse>(true);
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ id_goods: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ id_goods: sort })
      .limit(limit)
      .lean<Warehouse[]>(true);
  }

  async findAllGetName() {
    return await this.model.find().lean<Warehouse[]>(true);
  }
}
