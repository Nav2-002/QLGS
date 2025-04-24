import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateStaffDto } from './dto/create_staff.dto';
import { UpdateStaffDto } from './dto/update_staff.dto';
import { Staff, StaffDocument } from 'src/staff/model/staff.schema';

@Injectable()
export class StaffRepository {
  constructor(
    @InjectModel(Staff.name) private readonly model: Model<StaffDocument>,
  ) {}

  /**
   * Tìm nhân viên theo email.
   * @param email Email của nhân viên cần tìm.
   * @returns Nhân viên nếu tìm thấy, null nếu không tìm thấy.
   */
  async findByEmail(email: string): Promise<StaffDocument | null> {
    return this.model.findOne({ email }).exec();
  }

  /**
   * Tạo mới nhân viên.
   * @param staff Dữ liệu tạo mới nhân viên.
   * @returns Nhân viên đã được tạo.
   */
  async create(staff: CreateStaffDto): Promise<StaffDocument> {
    const newStaff = await new this.model({
      _id: new Types.ObjectId(),
      ...staff,
    }).save();
    return newStaff;
  }

  /**
   * Tìm nhân viên theo ID.
   * @param id ID của nhân viên cần tìm.
   * @returns Nhân viên nếu tìm thấy, null nếu không tìm thấy.
   */
  async findOne(id: string): Promise<Staff | null> {
    return await this.model.findOne({ _id: id }).lean<Staff>().exec();
  }

  /**
   * Tìm nhân viên theo ID và chỉ lấy các trường được chỉ định.
   * @param id ID của nhân viên cần tìm.
   * @param select Chuỗi các trường cần lấy, cách nhau bởi dấu cách (ví dụ: 'name email role').
   * @returns Nhân viên nếu tìm thấy, null nếu không tìm thấy.
   */

  async findMe(id: string, select: string) {
    return await this.model
      .findById({ _id: id })
      .select(select)
      .lean<Staff>(true);
  }

  /**
   * Cập nhật thông tin nhân viên theo ID.
   * @param id ID của nhân viên cần cập nhật.
   * @param staffOld Thông tin cũ của nhân viên (không sử dụng ở đây, có thể bỏ).
   * @param staffNew Dữ liệu mới để cập nhật nhân viên.
   * @returns Nhân viên đã được cập nhật, null nếu không tìm thấy.
   */

  async updateOne(
    id: string,
    staffOld: Staff,
    staffNew: UpdateStaffDto,
  ): Promise<StaffDocument | null> {
    const updateStaff = await this.model
      .findOneAndUpdate({ _id: id }, staffNew, { new: true })
      .exec();
    return updateStaff;
  }

  /**
   * Xóa nhân viên theo ID.
   * @param id ID của nhân viên cần xóa.
   * @returns Nhân viên đã bị xóa, null nếu không tìm thấy.
   */
  async deleteOne(id: string): Promise<StaffDocument | null> {
    return await this.model.findOneAndDelete({ _id: id }).exec();
  }

  /**
   * Cập nhật trạng thái của nhân viên theo ID.
   * @param id ID của nhân viên cần cập nhật.
   * @param status Trạng thái mới của nhân viên.
   * @returns Nhân viên đã được cập nhật trạng thái, null nếu không tìm thấy.
   */
  async updateStatusById(
    id: string,
    status: boolean,
  ): Promise<StaffDocument | null> {
    return await this.model
      .findOneAndUpdate({ _id: id }, { status }, { new: true })
      .exec();
  }

  /**
   * Tìm tất cả nhân viên có phân trang, sắp xếp và tìm kiếm.
   * @param page Số trang.
   * @param limit Số lượng nhân viên trên mỗi trang.
   * @param sort Thứ tự sắp xếp ('asc' hoặc 'desc').
   * @param keyword Từ khóa tìm kiếm (trong trường 'name').
   * @returns Mảng các nhân viên thỏa mãn điều kiện.
   */
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
      .select('-password')
      .exec();
  }

  /**
   * Lấy danh sách tất cả nhân viên (chỉ lấy các trường không nhạy cảm).
   * @returns Mảng các nhân viên.
   */
  async findAllGetName(): Promise<Staff[]> {
    return await this.model.find().lean<Staff[]>().exec();
  }
}
