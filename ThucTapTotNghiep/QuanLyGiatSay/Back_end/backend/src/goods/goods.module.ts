import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/db';
import { GoodsController } from './goods.controller'; // Đường dẫn đến hàng hóaController
import { GoodsRepository } from './goods.repository'; // Đường dẫn đến hàng hóaRepository
import { GoodsService } from './goods.service'; // Đường dẫn đến hàng hóaService
import { Goods, GoodsSchema } from 'src/goods/model/goods.schema';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: 'Goods', schema: GoodsSchema }]), // Import DatabaseModule để sử dụng schema 'Goods' trong MongoDB
    StoreModule, // Import SetStoreModule để sử dụng các tính năng liên quan đến cửa hàng
  ],
  controllers: [GoodsController], // Controller xử lý các yêu cầu HTTP liên quan đến hàng hóa
  providers: [GoodsService, GoodsRepository], // Cung cấp các service và repository để xử lý nghiệp vụ và tương tác với cơ sở dữ liệu
  exports: [GoodsRepository, GoodsService], // Xuất các service và repository để các module khác có thể sử dụng
})
export class GoodsModule {}
