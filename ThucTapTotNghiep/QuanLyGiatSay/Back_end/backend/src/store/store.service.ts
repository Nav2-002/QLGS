import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create_store.dto';
import { UpdateStoreDto } from './dto/update_store.dto';
import { StoreRepository } from './store.repository';
import { checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Injectable()
export class StoreService {
  constructor(private readonly repository: StoreRepository) {}

  async createStore(createStoreDto: CreateStoreDto) {
    const { ten_cuahang, sodienthoai, diachi, trangthai, id_quanly } =
      createStoreDto;

    try {
      if (id_quanly) {
        checkValisIsObject(id_quanly, 'id_quanly');
        // You might want to validate if the staff exists here, similar to the previous example.
      }
      return await this.repository.create({
        ten_cuahang,
        sodienthoai,
        diachi,
        trangthai,
        id_quanly,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findById(id: string) {
    checkValisIsObject(id, 'store id');
    const store = await this.repository.findOne(id);
    if (!store) {
      throw new NotFoundException('không tìm thấy cửa hàng');
    }

    return store;
  }

  async updateById(id: string, storeUpdate: UpdateStoreDto) {
    const { ten_cuahang, sodienthoai, diachi, trangthai, id_quanly } =
      storeUpdate;

    const store = await this.findById(id);

    try {
      if (id_quanly) {
        checkValisIsObject(id_quanly, 'id_quanly');
        // You might want to validate if the staff exists here, similar to the previous example.
      }

      return await this.repository.updateOne(id, store, {
        ten_cuahang,
        sodienthoai,
        diachi,
        trangthai,
        id_quanly,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
    }
  }

  async deleteById(id: string) {
    const store = await this.findById(id);

    await this.repository.deleteOne(store._id.toHexString());

    return store;
  }

  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'store id');

    const store = await this.repository.updateStatusById(id, status);
    if (!store) {
      throw new NotFoundException('không tìm thấy id cửa hàng');
    }

    return store;
  }

  findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;

    const newSort = sort != 'asc' ? 'desc' : 'asc';

    return this.repository.findAll(page, limit, newSort, keyword);
  }

  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}