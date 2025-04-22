import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateInvoiceDto } from './dto/create_invoice.dto';
import { UpdateInvoiceDto } from './dto/update_invoice.dto';
import { Invoice, InvoiceDocument } from './model/invoice.schema';

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectModel(Invoice.name)
    private readonly model: Model<InvoiceDocument>,
  ) {}

  // ✅ Tạo hóa đơn mới
  async create(dto: CreateInvoiceDto): Promise<Invoice> {
    const newInvoice = new this.model(dto);
    return await newInvoice.save();
  }

  // ✅ Lấy hóa đơn theo ID
  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Invoice>(true);
  }

  // ✅ Cập nhật hóa đơn
  async updateOne(id: string, invoiceOld: Invoice, invoiceNew: UpdateInvoiceDto) {
    const updatedInvoice = await this.model.findOneAndUpdate(
      { _id: id },
      invoiceNew,
      { new: true },
    );

    if (!updatedInvoice) {
      throw new Error('Không tìm thấy hóa đơn để cập nhật.');
    }

    return updatedInvoice;
  }

  // ✅ Xóa hóa đơn
  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  // ✅ Cập nhật trạng thái hóa đơn
  async updateStatusById(id: string, status: string) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { status: status }, { new: true })
      .lean<Invoice>(true);
  }

  // ✅ Lấy danh sách hóa đơn có phân trang + tìm kiếm
  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ date: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ date: sort })
      .limit(limit)
      .lean<Invoice[]>(true);
  }
  // ✅ Lấy danh sách hóa đơn trong một khoảng thời gian và theo cửa hàng
  async findAllByStoreAndDateRange(storeId: Types.ObjectId, startDate: Date, endDate: Date) {
    return await this.model
      .find({
        store_id: storeId, // Lọc theo store_id
        date: { $gte: startDate, $lt: endDate }, // Lọc theo khoảng thời gian
        status: 'paid', // Lọc chỉ những hóa đơn đã thanh toán
      })
      .lean<Invoice[]>(true);
  }
}
