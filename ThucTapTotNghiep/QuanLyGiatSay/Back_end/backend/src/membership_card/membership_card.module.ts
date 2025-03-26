import { Module } from '@nestjs/common';
import { MembershipCardService } from './membership_card.service';
import { MembershipCardController } from './membership_card.controller';
import { DatabaseModule } from 'src/config/db';
import { MembershipCard, MembershipCardSchema} from './model/membership_card.schema';
import { MembershipCardRepository } from './membership_card.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: MembershipCard.name, schema: MembershipCardSchema }
    ])
  ],
  controllers: [MembershipCardController],
  providers: [MembershipCardService, MembershipCardRepository]
})
export class MembershipCardModule {}

