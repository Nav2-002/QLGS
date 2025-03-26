import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from './model/admin.schema';
import { AdminRepository } from './admin.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }])],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
