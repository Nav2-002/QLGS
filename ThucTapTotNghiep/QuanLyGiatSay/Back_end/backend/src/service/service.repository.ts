import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateServiceDto } from './dto/create_service.dto';
import { UpdateServiceDto } from './dto/update_service.dto';
import { Service } from './model/service.schema';

@Injectable()
export class ServiceRepository {
  constructor(@InjectModel(Service.name) private readonly model: Model<Service>) {}

  /**
   * Tạo mới dịch vụ.
   * @param service Dữ liệu tạo mới dịch vụ.
   * @returns Dịch vụ đã tạo.
   */
  async create(service: CreateServiceDto) {
    const newService = new this.model({ _id: new Types.ObjectId(), ...service });
    return await newService.save();
  }

  /**
   * Tìm dịch vụ theo ID.
   * @param id ID của dịch vụ.
   * @returns Dịch vụ hoặc null nếu không tìm thấy.
   */
  async findOne(id: string) {
    return this.model.findOne({ _id: id }).lean<Service>(true);
  }

  /**
   * Cập nhật thông tin dịch vụ theo ID.
   * @param id ID của dịch vụ cần cập nhật.
   * @param _ Thông tin dịch vụ cũ (không được sử dụng trong hàm).
   * @param serviceNew Dữ liệu mới để cập nhật dịch vụ.
   * @returns Dịch vụ đã được cập nhật.
   */
  async updateOne(id: string, _: Service, serviceNew: UpdateServiceDto) {
    return this.model.findOneAndUpdate({ _id: id }, serviceNew, { new: true });
  }

  /**
   * Xóa dịch vụ theo ID.
   * @param id ID của dịch vụ cần xóa.
   * @returns Kết quả của thao tác xóa.
   */
  async deleteOne(id: string) {
    return this.model.findOneAndDelete({ _id: id });
  }

  /**
   * Tìm tất cả dịch vụ có phân trang, sắp xếp và tìm kiếm.
   * @param page Số trang.
   * @param limit Số lượng dịch vụ trên mỗi trang.
   * @param sort Thứ tự sắp xếp ('asc' hoặc 'desc').
   * @param keyword Từ khóa tìm kiếm (trong trường 'name').
   * @returns Mảng các dịch vụ thỏa mãn điều kiện.
   */
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

  /**
   * Lấy danh sách tất cả tên dịch vụ.
   * @returns Mảng các dịch vụ với chỉ thông tin tên.
   */
  async findAllGetName() {
    return await this.model.find().lean<Service[]>(true);
  }
}

