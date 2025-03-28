import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/db';
import { SupplierController } from './supplier.controller';
import { SupplierRepository } from './supplier.repository';
import { SupplierService } from './supplier.service';
import { Supplier, SupplierSchema } from './model/supplier.schema'; // Import the Supplier interface from the schemas/supplier.schema';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: 'Supplier', schema: SupplierSchema }]),
    StoreModule,
  ],
  controllers: [SupplierController],
  providers: [SupplierService, SupplierRepository],
  exports: [SupplierService, SupplierRepository],
})
export class SupplierModule {}
