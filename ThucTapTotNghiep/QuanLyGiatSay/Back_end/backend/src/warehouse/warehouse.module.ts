import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { WarehouseRepository } from './warehouse.repository';
import { Warehouse, WarehouseSchema } from './model/warehouse.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Warehouse.name, schema: WarehouseSchema }]),
  ],
  controllers: [WarehouseController],
  providers: [WarehouseService, WarehouseRepository],
  exports: [WarehouseService, WarehouseRepository],
})
export class WarehouseModule {}
