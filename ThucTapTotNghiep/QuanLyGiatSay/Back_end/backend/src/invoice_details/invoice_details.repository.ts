import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceDetail, InvoiceDetailDocument } from './model/invoice_details.schema'; // Import model và interface
import { CreateInvoiceDetailDto } from './dto/create_invoice_details.dto';    // DTO tạo mới
import { UpdateInvoiceDetailDto } from './dto/update_invoice_details.dto';    // DTO cập nhật

@Injectable()
export class InvoiceDetailRepository {
  constructor(
    @InjectModel(InvoiceDetail.name)
    private readonly model: Model<InvoiceDetailDocument>,
  ) {}

  /**
   * Tạo mới chi tiết hóa đơn.
   * @param dto Dữ liệu tạo mới.
   * @returns Chi tiết hóa đơn đã tạo.
   */
  async create(dto: CreateInvoiceDetailDto): Promise<InvoiceDetail> {
    return await new this.model(dto).save();
  }

  /**
   * Tìm chi tiết hóa đơn theo ID.
   * @param id ID của chi tiết hóa đơn.
   * @returns Chi tiết hóa đơn hoặc null nếu không tìm thấy.
   */
  async findOne(id: string): Promise<InvoiceDetail | null> {
    return await this.model.findById(id).lean();
  }

  /**
   * Cập nhật chi tiết hóa đơn theo ID.
   * @param id ID của chi tiết hóa đơn.
   * @param updateDto Dữ liệu cập nhật.
   * @returns Chi tiết hóa đơn đã cập nhật hoặc null nếu không tìm thấy.
   */
  async updateOne(id: string, updateDto: UpdateInvoiceDetailDto): Promise<InvoiceDetail | null> {
    return await this.model.findByIdAndUpdate(id, updateDto, { new: true }).lean();
  }

  /**
   * Xóa chi tiết hóa đơn theo ID.
   * @param id ID của chi tiết hóa đơn.
   */
  async deleteOne(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  /**
   * Tìm tất cả chi tiết hóa đơn (có phân trang và tìm kiếm).
   * @param page Số trang.
   * @param limit Số lượng kết quả trên mỗi trang.
   * @param sort Thứ tự sắp xếp ('asc' hoặc 'desc').
   * @param keyword Từ khóa tìm kiếm (trong trường 'note').
   * @returns Mảng các chi tiết hóa đơn.
   */
  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ note: new RegExp(keyword, 'i') }] } : {}) // Tìm kiếm theo từ khóa trong trường 'note'
      .skip((page - 1) * limit) // Bỏ qua các kết quả của các trang trước
      .sort({ note: sort })     // Sắp xếp theo trường 'note'
      .limit(limit)             // Giới hạn số lượng kết quả trả về
      .lean<InvoiceDetail[]>(true); // Chuyển đổi kết quả thành plain objects
  }

  /**
   * Tìm tất cả chi tiết hóa đơn của một hóa đơn theo ID hóa đơn.
   * @param id_invoice ID của hóa đơn.
   * @returns Mảng các chi tiết hóa đơn của hóa đơn đó.
   */
  async findAllByInvoiceId(id_invoice: string): Promise<InvoiceDetail[]> {
    return await this.model.find({ id_invoice }).lean();
  }
}
