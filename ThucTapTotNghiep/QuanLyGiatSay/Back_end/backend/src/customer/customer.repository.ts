import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCustomerDto } from './dto/create_customer.dto';      // DTO cho tạo mới Customer
import { UpdateCustomerDto } from './dto/update_customer.dto';      // DTO cho cập nhật Customer
import { Customer, CustomerDocument } from 'src/customer/model/customer.schema';        // Model và Document interface của Customer
import { CreateStoreDto } from 'src/store/dto/create_store.dto'; // Import này không được sử dụng
import { UpdateStoreDto } from 'src/store/dto/update_store.dto'; // Import này không được sử dụng

@Injectable()
export class CustomerRepository {
  constructor(@InjectModel(Customer.name) private readonly model: Model<Customer>) {}

  /**
   * Tìm Customer theo email.
   */
  async findByEmail(email: string): Promise<CustomerDocument | null> {
    return this.model.findOne({ email }).exec();
  }

  /**
   * Tạo mới Customer.
   */
  async create(customer: CreateCustomerDto) {
    const newCustomer = await new this.model({
      _id: new Types.ObjectId(),
      ...customer,
    }).save();

    return newCustomer;
  }

  /**
   * Tìm Customer theo ID.
   */
  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Customer>(true);
  }

  /**
   * Cập nhật thông tin Customer theo ID.
   */
  async updateOne(id: string, customerOld: Customer, customerNew: UpdateCustomerDto) {
    const updateCustomer = await this.model.findOneAndUpdate(
      { _id: id },
      customerNew,
      {
        new: true,
      },
    );

    return updateCustomer;
  }

  /**
   * Xóa Customer theo ID.
   */
  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  /**
   * Tìm tất cả Customer có phân trang, sắp xếp và tìm kiếm.
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
      .lean<Customer[]>(true);
  }

  /**
   * Lấy danh sách tất cả Customer (chỉ lấy các thông tin cơ bản).
   */
  async findAllGetName() {
    return await this.model.find().lean<Customer[]>(true);
  }
}
