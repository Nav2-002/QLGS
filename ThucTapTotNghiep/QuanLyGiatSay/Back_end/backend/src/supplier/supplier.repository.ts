import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateSupplierDto } from './dto/create_supplier.dto';
import { UpdateSupplierDto } from './dto/update_supplier.dto';
import { Supplier, SupplierDocument } from './model/supplier.schema'; // Import the Supplier interface from the schemas/supplier.schema';

@Injectable()
export class SupplierRepository {
  constructor(@InjectModel(Supplier.name) private readonly model: Model<SupplierDocument>) {}

  async create(supplier: CreateSupplierDto) {
    const newSupplier = new this.model({
      _id: new Types.ObjectId(),
      ...supplier,
    });

    return await newSupplier.save();
  }

  async findOne(id: string) {
    return await this.model
      .findOne({ _id: id })
      .lean<Supplier>(true);
  }

  async updateOne(id: string, supplierNew: UpdateSupplierDto) {
    const updatedSupplier = await this.model.findOneAndUpdate({ _id: id }, supplierNew, {
      new: true,
    });

    if (!updatedSupplier) {
      throw new Error('Không tìm thấy nhà cung cấp để cập nhật.');
    }

    return updatedSupplier;
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
      .lean<Supplier[]>(true);
  }
}
