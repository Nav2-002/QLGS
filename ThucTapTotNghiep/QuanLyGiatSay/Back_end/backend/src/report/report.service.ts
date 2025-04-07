import { Injectable, BadRequestException } from '@nestjs/common';
import { InvoiceRepository } from 'src/invoice/invoice.repository';
import { ReportItemDto } from './dto/report-item.dto';
import { Types } from 'mongoose';

@Injectable()
export class ReportService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  // Phương thức chính để xử lý yêu cầu báo cáo
  async getReport(lastDate: string, storeId: string) {
    if (!Types.ObjectId.isValid(storeId)) {
      throw new BadRequestException('Invalid Store ID');
    }

    const storeObjectId = new Types.ObjectId(storeId);

    switch (lastDate) {
      case 'last_7_days':
        return await this.getLastOptionDaysInvoice(storeObjectId, 7);
      case 'last_30_days':
        return await this.getLastOptionDaysInvoice(storeObjectId, 30);
      case 'last_year':
        return await this.getLastYearInvoice(storeObjectId);
      default:
        return await this.getLastOptionDaysInvoice(storeObjectId, 7);
    }
  }

  // Báo cáo trong một số ngày tùy chọn cho cửa hàng
  async getLastOptionDaysInvoice(storeId: Types.ObjectId, day: number) {
    let reportItem: ReportItemDto[] = [];
    const currentDate = new Date();
  
    for (let i = 0; i < day; i++) {
      const startDate = new Date(currentDate);
      startDate.setDate(currentDate.getDate() - i); // Ngày bắt đầu
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1); // Ngày kết thúc (ngày tiếp theo)
  
      const invoices = await this.invoiceRepository.findAllByStoreAndDateRange(storeId, startDate, endDate);
  
      let gross_sales = 0;
  
      if (invoices.length > 0) {
        invoices.forEach((invoice) => {
          gross_sales += invoice.total_price; // Tính tổng tiền của các hóa đơn
        });
      }
  
      reportItem.push({
        gross_sales: gross_sales,
        orders_count: invoices.length, // Tính tổng số đơn hàng
        date: startDate,
        store_id: storeId, // Thêm store_id vào đây
      });
    }
  
    return reportItem;
  }

  // Báo cáo doanh thu của từng tháng trong 12 tháng qua cho cửa hàng
  async getLastYearInvoice(storeId: Types.ObjectId) {
    let reportItem: ReportItemDto[] = [];
    const monthCount = 12;
    const currentDate = new Date();
  
    const startMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - monthCount,
      1,
    );
  
    for (let i = 0; i < monthCount; i++) {
      const monthStart = new Date(startMonth);
      monthStart.setMonth(startMonth.getMonth() + i);
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthStart.getMonth() + 1);
  
      const invoices = await this.invoiceRepository.findAllByStoreAndDateRange(storeId, monthStart, monthEnd);
  
      let gross_sales = 0;
  
      if (invoices.length > 0) {
        invoices.forEach((invoice) => {
          gross_sales += invoice.total_price; // Tính tổng tiền của các hóa đơn
        });
      }
  
      reportItem.push({
        gross_sales: gross_sales,
        orders_count: invoices.length, // Tính tổng số đơn hàng
        date: monthStart,
        store_id: storeId, // Thêm store_id vào đây
      });
    }
  
    return reportItem;
  }
}
