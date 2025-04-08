import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateStaffDto } from './dto/create_staff.dto';
import { UpdateStaffDto } from './dto/update_staff.dto';
import { Staff, StaffDocument } from 'src/staff/model/staff.schema';

@Injectable()
export class StaffRepository {
  constructor(@InjectModel(Staff.name) private readonly model: Model<StaffDocument>) {}

  async findByEmail(email: string): Promise<StaffDocument | null> {
    return this.model.findOne({ email }).exec();
  }

  async create(staff: CreateStaffDto): Promise<StaffDocument> {
    const newStaff = await new this.model({
      _id: new Types.ObjectId(),
      ...staff,
    }).save();
    return newStaff;
  }

  async findOne(id: string): Promise<Staff | null> {
    return await this.model.findOne({ _id: id }).lean<Staff>().exec();
  }

  async updateOne(
    id: string,
    staffOld: Staff,
    staffNew: UpdateStaffDto,
  ): Promise<StaffDocument | null> {
    const updateStaff = await this.model.findOneAndUpdate(
      { _id: id },
      staffNew,
      { new: true },
    ).exec();
    return updateStaff;
  }

  async deleteOne(id: string): Promise<StaffDocument | null> {
    return await this.model.findOneAndDelete({ _id: id }).exec();
  }

  async updateStatusById(id: string, status: boolean): Promise<StaffDocument | null> {
    return await this.model
      .findOneAndUpdate({ _id: id }, { status }, { new: true })
      .exec();
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ): Promise<Staff[]> {
    return await this.model
      .find(keyword ? { $or: [{ name: new RegExp(keyword, 'i') }] } : {}) // Tìm kiếm theo 'name'
      .skip((page - 1) * limit)
      .sort({ name: sort }) // Sắp xếp theo 'name'
      .limit(limit)
      .lean<Staff[]>()
      .exec();
  }

  async findAllGetName(): Promise<Staff[]> {
    return await this.model.find().lean<Staff[]>().exec();
  }
}