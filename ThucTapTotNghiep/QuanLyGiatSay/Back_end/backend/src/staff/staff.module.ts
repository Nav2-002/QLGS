import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { DatabaseModule } from 'src/config/db';
import { Staff, StaffSchema} from './model/staff.schema';
import { StaffRepository } from './staff.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: Staff.name, schema: StaffSchema }
    ])
  ],
  controllers: [StaffController],
  providers: [StaffService, StaffRepository],
  exports: [
      StaffService,
      StaffRepository,
      MongooseModule, // ❗ Export cái này để AuthModule có thể dùng được AdminModel
    ],
  })
export class StaffModule {}

