import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { DatabaseModule } from 'src/config/db';
import { Staff, StaffSchema} from './model/staff.schema';
import { StaffRepository } from './staff.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: Staff.name, schema: StaffSchema }
    ])
  ],
  controllers: [StaffController],
  providers: [StaffService, StaffRepository]
})
export class StaffModule {}

