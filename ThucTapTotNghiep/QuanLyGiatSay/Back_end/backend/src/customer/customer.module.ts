import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer, CustomerSchema } from './model/customer.schema';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
