import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateAdminDto } from './dto/create_admin.dto';
import { UpdateAdminDto } from './dto/update_admin.dto';
import { Admin } from 'src/admin/model/admin.schema';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectModel(Admin.name) private readonly model: Model<Admin>,
  ) {}

  async create(admin: CreateAdminDto) {
    const newAdmin = await new this.model({
      _id: new Types.ObjectId(),
      ...admin,
    }).save();

    return newAdmin;
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Admin>(true);
  }

  async updateOne(
    id: string,
    adminOld: Admin,
    adminNew: UpdateAdminDto,
  ) {
    const updateAdmin = await this.model.findOneAndUpdate(
      { _id: id },
      adminNew,
      {
        new: true,
      },
    );

    return updateAdmin;
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
      .sort({ name: sort })
      .limit(limit)
      .lean<Admin[]>(true);
  }

  async findAllGetName() {
    return await this.model.find().lean<Admin[]>(true);
  }
}
