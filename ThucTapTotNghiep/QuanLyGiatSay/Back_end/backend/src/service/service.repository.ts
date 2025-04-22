// service.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateServiceDto } from './dto/create_service.dto';
import { UpdateServiceDto } from './dto/update_service.dto';
import { Service } from './model/service.schema';

@Injectable()
export class ServiceRepository {
  constructor(@InjectModel(Service.name) private readonly model: Model<Service>) {}

  async create(service: CreateServiceDto) {
    const newService = new this.model({ _id: new Types.ObjectId(), ...service });
    return await newService.save();
  }

  async findOne(id: string) {
    return this.model.findOne({ _id: id }).lean<Service>(true);
  }

  async updateOne(id: string, _: Service, serviceNew: UpdateServiceDto) {
    return this.model.findOneAndUpdate({ _id: id }, serviceNew, { new: true });
  }

  async deleteOne(id: string) {
    return this.model.findOneAndDelete({ _id: id });
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ name: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ name: sort })
      .limit(limit)
      .lean<Service[]>(true);
  }

  async findAllGetName() {
    return this.model.find().lean<Service[]>(true);
  }
}
