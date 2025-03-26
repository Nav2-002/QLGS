import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/db';
import { StoreController } from './store.controller';
import { StoreRepository } from './store.repository';
import { StoreService } from './store.service';
import { Store, StoreSchema } from 'src/store/model/store.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository],
  exports: [StoreRepository, StoreService],
})
export class StoreModule {}