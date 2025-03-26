import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateStaffDto } from './dto/create_staff.dto';
import { UpdateStaffDto } from './dto/update_staff.dto';
import { Staff } from 'src/staff/model/staff.schema';

@Injectable()
export class StaffRepository {
  constructor(@InjectModel(Staff.name) private readonly model: Model<Staff>) {}

  async create(staff: CreateStaffDto) {
    const newStaff = await new this.model({
      _id: new Types.ObjectId(),
      ...staff,
    }).save();

    return newStaff;
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Staff>(true);
  }

  async updateOne(id: string, staffOld: Staff, staffNew: UpdateStaffDto) {
    const updateStaff = await this.model.findOneAndUpdate(
      { _id: id },
      staffNew,
      {
        new: true,
      },
    );

    return updateStaff;
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { trangthai: status }, { new: true })
      .lean<Staff>(true);
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ so_the: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ so_the: sort })
      .limit(limit)
      .lean<Staff[]>(true);
  }

  async findAllGetName() {
    return await this.model.find().lean<Staff[]>(true);
  }
}