import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({// Sử dụng MongooseModule để kết nối với cơ sở dữ liệu MongoDB
      useFactory: async () => ({// URL kết nối đến cơ sở dữ liệu MongoDB, ở đây là database 'shopme' chạy trên localhost
        uri: 'mongodb://localhost:27017/QuanLyGiatSay',
      }),
    }),
  ],
})
export class DatabaseModule {
 // Hàm này được gọi từ các module khác khi cần sử dụng các schema MongoDB trong ứng dụng
 static forFeature(models: ModelDefinition[]) {
  return MongooseModule.forFeature(models); // Đăng ký các schema vào module để sử dụng trong ứng dụng
}
}
