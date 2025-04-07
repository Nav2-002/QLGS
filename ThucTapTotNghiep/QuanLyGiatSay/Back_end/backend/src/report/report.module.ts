import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { InvoiceModule } from 'src/invoice/invoice.module'; // Đưa InvoiceModule vào để sử dụng các dịch vụ liên quan đến hóa đơn

@Module({
  imports: [InvoiceModule],
  controllers: [ReportController], // Chỉ định controller xử lý các yêu cầu HTTP liên quan đến báo cáo
  providers: [ReportService], // Cung cấp service để xử lý logic nghiệp vụ báo cáo
})
export class ReportModule {}
