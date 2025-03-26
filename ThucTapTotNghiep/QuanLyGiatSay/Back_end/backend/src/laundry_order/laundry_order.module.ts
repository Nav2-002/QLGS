import { Module } from '@nestjs/common';
import { LaundryOrderService } from './laundry_order.service';
import { LaundryOrderRepository } from './laundry_order.repository';
import { LaundryOrderController } from './laundry_order.controller';
import { DatabaseModule } from 'src/config/db';
import { LaundryOrder, LaundryOrderSchema } from './model/laundry_order.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([ // Đăng ký các schema (mô hình dữ liệu) vào module để có thể sử dụng trong ứng dụng
      { name: LaundryOrder.name, schema: LaundryOrderSchema },// Đăng ký schema Order vào module
    ]),
  ],
  controllers: [LaundryOrderController], // Chỉ định controller sẽ xử lý các yêu cầu liên quan đến Order
  providers: [LaundryOrderService, LaundryOrderRepository], // Cung cấp service và repository để xử lý logic liên quan đến Order
  exports: [LaundryOrderService, LaundryOrderRepository], // Xuất ra OrderService và OrderRepository để các module khác có thể sử dụng

})
export class LaundryOrderModule {}
