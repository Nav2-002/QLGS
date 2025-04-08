import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePromotionDto } from './dto/create_promotion.dto';
import { UpdatePromotionDto } from './dto/update_promotion.dto';
import { Promotion } from 'src/promotion/model/promotion.schema';

@Injectable()
export class PromotionRepository {
  constructor(@InjectModel(Promotion.name) private readonly model: Model<Promotion>) {}

  async create(promotion: CreatePromotionDto) {
    const newPromotion = await new this.model({
      _id: new Types.ObjectId(),
      ...promotion,
    }).save();

    return newPromotion;
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Promotion>(true);
  }

  async updateOne(id: string, promotionOld: Promotion, promotionNew: UpdatePromotionDto) {
    const updatePromotion = await this.model.findOneAndUpdate(
      { _id: id },
      promotionNew,
      {
        new: true,
      },
    );

    return updatePromotion;
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { trangthai: status }, { new: true })
      .lean<Promotion>(true);
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ name: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ name: sort })
      .limit(limit)
      .lean<Promotion[]>(true);
  }

  async findAllGetName() {
    return await this.model.find().lean<Promotion[]>(true);
  }
}