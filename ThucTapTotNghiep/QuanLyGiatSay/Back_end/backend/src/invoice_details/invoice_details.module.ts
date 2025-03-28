import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceDetail, InvoiceDetailSchema } from './model/invoice_details.schema';
import { InvoiceDetailRepository } from './invoice_details.repository';
import { InvoiceDetailService } from './invoice_details.service';
import { InvoiceDetailController } from './invoice_details.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: InvoiceDetail.name, schema: InvoiceDetailSchema }])],
  providers: [InvoiceDetailRepository, InvoiceDetailService],
  controllers: [InvoiceDetailController],
})
export class InvoiceDetailModule {}
