import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateMembershipCardDto } from './dto/create_membership_card.dto';
import { UpdateMembershipCardDto } from './dto/update_membership_card.dto';
import { MembershipCard } from 'src/membership_card/model/membership_card.schema';

@Injectable()
export class MembershipCardRepository {
  constructor(@InjectModel(MembershipCard.name) private readonly model: Model<MembershipCard>) {}

  async create(membershipCard: CreateMembershipCardDto) {
    const newMembershipCard = await new this.model({
      _id: new Types.ObjectId(),
      ...membershipCard,
    }).save();

    return newMembershipCard;
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<MembershipCard>(true);
  }

  async updateOne(id: string, membershipCardOld: MembershipCard, membershipCardNew: UpdateMembershipCardDto) {
    const updateMembershipCard = await this.model.findOneAndUpdate(
      { _id: id },
      membershipCardNew,
      {
        new: true,
      },
    );

    return updateMembershipCard;
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { trangthai: status }, { new: true })
      .lean<MembershipCard>(true);
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ card_number: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ so_the: sort })
      .limit(limit)
      .lean<MembershipCard[]>(true);
  }

  async findAllGetName() {
    return await this.model.find().lean<MembershipCard[]>(true);
  }
}
