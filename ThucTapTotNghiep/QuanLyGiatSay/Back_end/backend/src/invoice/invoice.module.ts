import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/db';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceRepository } from './invoice.repository';
import { Invoice, InvoiceSchema } from './model/invoice.schema';
import { forwardRef } from '@nestjs/common';
import { LaundryOrderModule } from 'src/laundry_order/laundry_order.module';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema }]),
    forwardRef(() => LaundryOrderModule), // Nếu hóa đơn liên quan đến đơn hàng giặt
    StoreModule,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService, InvoiceRepository],
  exports: [InvoiceService, InvoiceRepository],
})
export class InvoiceModule {}
