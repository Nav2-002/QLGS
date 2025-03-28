import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceDetail, InvoiceDetailDocument } from './model/invoice_details.schema';
import { CreateInvoiceDetailDto } from './dto/create_invoice_details.dto';
import { UpdateInvoiceDetailDto } from './dto/update_invoice_details.dto';

@Injectable()
export class InvoiceDetailRepository {
  constructor(
    @InjectModel(InvoiceDetail.name)
    private readonly model: Model<InvoiceDetailDocument>,
  ) {}

  async create(dto: CreateInvoiceDetailDto): Promise<InvoiceDetail> {
    return await new this.model(dto).save();
  }

  async findOne(id: string): Promise<InvoiceDetail | null> {
    return await this.model.findById(id).lean();
  }

  async updateOne(id: string, updateDto: UpdateInvoiceDetailDto): Promise<InvoiceDetail | null> {
    return await this.model.findByIdAndUpdate(id, updateDto, { new: true }).lean();
  }

  async deleteOne(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async findAll(page: number, limit: number, sort: 'asc' | 'desc', keyword?: string): Promise<InvoiceDetail[]> {
    const filter = keyword ? { ghichu: { $regex: keyword, $options: 'i' } } : {};
    return await this.model
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: sort === 'asc' ? 1 : -1 })
      .lean();
  }

  async findAllByInvoiceId(id_invoice: string): Promise<InvoiceDetail[]> {
    return await this.model.find({ id_invoice }).lean();
  }
}
