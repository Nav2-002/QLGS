// service.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service, ServiceSchema } from './model/service.schema';
import { ServiceRepository } from './service.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }])],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
})
export class ServiceModule {}

