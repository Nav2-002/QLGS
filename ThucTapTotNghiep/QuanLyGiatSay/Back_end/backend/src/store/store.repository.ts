import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateStoreDto } from './dto/create_store.dto';
import { UpdateStoreDto } from './dto/update_store.dto';
import { Store } from 'src/store/model/store.schema';

@Injectable()
export class StoreRepository {
  constructor(@InjectModel(Store.name) private readonly model: Model<Store>) {}

  async create(store: CreateStoreDto) {
    const newStore = await new this.model({
      _id: new Types.ObjectId(),
      ...store,
    }).save();

    return newStore;
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Store>(true);
  }

  async updateOne(id: string, storeOld: Store, storeNew: UpdateStoreDto) {
    const updateStore = await this.model.findOneAndUpdate(
      { _id: id },
      storeNew,
      {
        new: true,
      },
    );

    return updateStore;
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id });
  }

  async updateStatusById(id: string, status: boolean) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { trangthai: status }, { new: true })
      .lean<Store>(true);
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ ten_cuahang: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ ten_cuahang: sort })
      .limit(limit)
      .lean<Store[]>(true);
  }

  async findAllGetName() {
    return await this.model.find().lean<Store[]>(true);
  }
}