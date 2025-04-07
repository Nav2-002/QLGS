import { DatabaseModule } from './config/db';
import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { MembershipCardModule } from './membership_card/membership_card.module';
import { PromotionModule } from './promotion/promotion.module';
import { ServiceModule } from './service/service.module';
import { StaffModule } from './staff/staff.module';
import { StoreModule } from './store/store.module';
import { GoodsModule } from './goods/goods.module';
import { LaundryOrderModule } from './laundry_order/laundry_order.module';
import { AdminModule } from './admin/admin.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceDetailModule } from './invoice_details/invoice_details.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { DeliveryModule } from './delivery/delivery.module';
import { SupplierModule } from './supplier/supplier.module';
import { ShelfModule } from './shelf/shelf.module';
import { StockTransactionModule } from './stock_transaction/stock_transaction.module';
import { ReportModule } from './report/report.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    CustomerModule,
    MembershipCardModule,
    PromotionModule,
    ServiceModule,
    StaffModule,
    StoreModule,
    GoodsModule,
    LaundryOrderModule,
    AdminModule,
    InvoiceModule,
    InvoiceDetailModule,
    WarehouseModule,
    DeliveryModule,
    SupplierModule,
    ShelfModule,
    StockTransactionModule,
    ReportModule
  ],
})
export class AppModule {}
