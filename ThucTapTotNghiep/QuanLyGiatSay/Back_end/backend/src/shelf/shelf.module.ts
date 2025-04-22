import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelfController } from './shelf.controller';
import { ShelfService } from './shelf.service';
import { Shelf, ShelfSchema } from './model/shelf.schema';
import { ShelfRepository } from './shelf.repository';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Shelf.name, schema: ShelfSchema }]),
//   ],
//   controllers: [ShelfController],
//   providers: [ShelfService],
// })
// export class ShelfModule {}
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shelf.name, schema: ShelfSchema }]),
  ],
  controllers: [ShelfController],
  providers: [ShelfService, ShelfRepository], // Thêm ShelfRepository vào đây
})
export class ShelfModule {}
