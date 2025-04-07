import { Controller, Get, Param, Query, BadRequestException } from '@nestjs/common';
import { ReportService } from './report.service';
import { Types } from 'mongoose';

@Controller('reports')
export class ReportController {
  constructor(private readonly service: ReportService) {}

  @Get(':period')
  async getReport(
    @Param('period') period: string,  // Nhận period từ URL
    @Query('storeId') storeId: string, // Nhận storeId từ query
  ) {
    if (!storeId || !Types.ObjectId.isValid(storeId)) {
      throw new BadRequestException('Invalid or missing Store ID');
    }
    
    return this.service.getReport(period, storeId);
  }
}
