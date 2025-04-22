import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCustomerDto } from './dto/create_customer.dto';
import { UpdateCustomerDto } from './dto/update_customer.dto';
import { Customer, CustomerDocument } from 'src/customer/model/customer.schema';
import { CreateStoreDto } from 'src/store/dto/create_store.dto';
import { UpdateStoreDto } from 'src/store/dto/update_store.dto';

@Injectable()
export class CustomerRepository {
  constructor(@InjectModel(Customer.name) private readonly model: Model<Customer>) {}

  async findByEmail(email: string): Promise<CustomerDocument | null> {
    return this.model.findOne({ email }).exec();
}

  async create(customer: CreateCustomerDto) {
    const newCustomer = await new this.model({
      _id: new Types.ObjectId(),
      ...customer,
    }).save();

    return newCustomer;
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Customer>(true);
  }

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
      .find(keyword ? { $or: [{ name: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ name: sort })
      .limit(limit)
      .lean<Customer[]>(true);
  }

  async findAllGetName() {
    return await this.model.find().lean<Customer[]>(true);
  }
}
