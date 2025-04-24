import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoiceDetailRepository } from './invoice_details.repository';  // Repository InvoiceDetail
import { CreateInvoiceDetailDto } from './dto/create_invoice_details.dto';     // DTO tạo mới
import { UpdateInvoiceDetailDto } from './dto/update_invoice_details.dto';     // DTO cập nhật
import { ParamPaginationDto } from 'src/common/param-pagination.dto';    // DTO phân trang
import { buildPagination } from 'src/common/common';                // Hàm tiện ích phân trang

@Injectable()
export class InvoiceDetailService {
  constructor(private readonly repository: InvoiceDetailRepository) {}

  /**
   * Tạo mới chi tiết hóa đơn.
   * @param dto Dữ liệu tạo mới.
   * @returns Chi tiết hóa đơn đã tạo.
   */
  async create(dto: CreateInvoiceDetailDto) {
    return this.repository.create(dto);
  }

  /**
   * Lấy chi tiết hóa đơn theo ID.
   * @param id ID của chi tiết hóa đơn.
   * @returns Chi tiết hóa đơn.
   * @throws NotFoundException nếu không tìm thấy chi tiết hóa đơn.
   */
  async findOne(id: string) {
    const detail = await this.repository.findOne(id);
    if (!detail) {
      throw new NotFoundException(`Không tìm thấy chi tiết hóa đơn có ID: ${id}`);
    }
    return detail;
  }

  /**
   * Cập nhật chi tiết hóa đơn theo ID.
   * @param id ID của chi tiết hóa đơn.
   * @param dto Dữ liệu cập nhật.
   * @returns Chi tiết hóa đơn đã cập nhật.
   * @throws NotFoundException nếu không tìm thấy chi tiết hóa đơn.
   */
  async update(id: string, dto: UpdateInvoiceDetailDto) {
    await this.findOne(id); // Đảm bảo chi tiết hóa đơn tồn tại trước khi cập nhật
    return this.repository.updateOne(id, dto);
  }

  /**
   * Xóa chi tiết hóa đơn theo ID.
   * @param id ID của chi tiết hóa đơn.
   * @throws NotFoundException nếu không tìm thấy chi tiết hóa đơn.
   */
  async delete(id: string) {
    await this.findOne(id); // Đảm bảo chi tiết hóa đơn tồn tại trước khi xóa
    return this.repository.deleteOne(id);
  }

  /**
   * Lấy danh sách chi tiết hóa đơn (có phân trang và tìm kiếm).
   * @param params Các tham số phân trang và tìm kiếm.
   * @returns Danh sách chi tiết hóa đơn đã phân trang.
   */
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';

    const invoice_details = await this.repository.findAll(page, limit, newSort, keyword);

    // Lấy tất cả invoice_details để tính total -> Đổi thành lấy tất cả invoice_details
    const allInvoice_details = await this.repository.findAll(1, 0, newSort, keyword);

    return buildPagination(allInvoice_details, params, invoice_details);
  }

  /**
   * Lấy tất cả chi tiết hóa đơn của một hóa đơn theo ID hóa đơn.
   * @param id_invoice ID của hóa đơn.
   * @returns Danh sách chi tiết hóa đơn của hóa đơn đó.
   */
  async findAllByInvoiceId(id_invoice: string) {
    return this.repository.findAllByInvoiceId(id_invoice);
  }
}
