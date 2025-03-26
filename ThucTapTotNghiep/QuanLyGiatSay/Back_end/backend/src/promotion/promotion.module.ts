import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/db';
import { PromotionController } from './promotion.controller';
import { PromotionRepository } from './promotion.repository';
import { PromotionService } from './promotion.service';
import { Promotion, PromotionSchema } from 'src/promotion/model/promotion.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Promotion.name, schema: PromotionSchema }]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService, PromotionRepository],
  exports: [PromotionRepository, PromotionService],
})
export class PromotionModule {}