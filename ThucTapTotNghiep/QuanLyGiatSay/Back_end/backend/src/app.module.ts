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
@Module({
  imports: [
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
  ],
})
export class AppModule {}
