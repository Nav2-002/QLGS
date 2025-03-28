import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelfController } from './shelf.controller';
import { ShelfService } from './shelf.service';
import { Shelf, ShelfSchema } from './model/shelf.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shelf.name, schema: ShelfSchema }]),
  ],
  controllers: [ShelfController],
  providers: [ShelfService],
})
export class ShelfModule {}
