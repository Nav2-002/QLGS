import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Delivery, DeliverySchema } from './model/delivery.schema';
import { DeliveryService } from './delivery.service';
import { DeliveryRepository } from './delivery.repository';
import { DeliveryController } from './delivery.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Delivery.name, schema: DeliverySchema }])],
  controllers: [DeliveryController],
  providers: [DeliveryService, DeliveryRepository],
  exports: [DeliveryService, DeliveryRepository],
})
export class DeliveryModule {}
