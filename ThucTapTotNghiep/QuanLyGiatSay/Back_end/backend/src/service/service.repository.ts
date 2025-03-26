import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateServiceDto } from './dto/create_service.dto';
import { UpdateServiceDto } from './dto/update_service.dto';
import { Service } from 'src/service/model/service.schema';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectModel(Service.name) private readonly model: Model<Service>,
  ) {}

  async create(service: CreateServiceDto) {
    const newService = await new this.model({
      _id: new Types.ObjectId(),
      ...service,
    }).save();

    return newService;
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Service>(true);
  }

  async updateOne(
    id: string,
    serviceOld: Service,
    serviceNew: UpdateServiceDto,
  ) {
    const updateService = await this.model.findOneAndUpdate(
      { _id: id },
      serviceNew,
      {
        new: true,
      },
    );

    return updateService;
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ ten: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ ten: sort })
      .limit(limit)
      .lean<Service[]>(true);
  }

  async findAllGetName() {
    return await this.model.find().lean<Service[]>(true);
  }
}
