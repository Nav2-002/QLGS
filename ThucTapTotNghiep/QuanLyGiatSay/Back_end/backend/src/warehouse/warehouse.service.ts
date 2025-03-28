import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create_warehouse.dto';
import { UpdateWarehouseDto } from './dto/update_warehouse.dto';
import { WarehouseRepository } from './warehouse.repository';
import { checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Injectable()
export class WarehouseService {
  constructor(private readonly repository: WarehouseRepository) {}

  async createWarehouse(createWarehouseDto: CreateWarehouseDto) {
    const { id_store, id_goods, quantity, status } = createWarehouseDto;

    try {
      checkValisIsObject(id_store, 'id_store');
      checkValisIsObject(id_goods, 'id_goods');

      return await this.repository.create({
        id_store,
        id_goods,
        quantity,
        status,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findById(id: string) {
    checkValisIsObject(id, 'warehouse id');

    const warehouse = await this.repository.findOne(id);
    if (!warehouse) {
      throw new NotFoundException('Không tìm thấy kho hàng');
    }
    return warehouse;
  }

  async updateById(id: string, warehouseUpdate: UpdateWarehouseDto) {
    const warehouse = await this.findById(id);

    try {
      if (warehouseUpdate.id_store) {
        checkValisIsObject(warehouseUpdate.id_store, 'id_store');
      }
      if (warehouseUpdate.id_goods) {
        checkValisIsObject(warehouseUpdate.id_goods, 'id_goods');
      }

      return await this.repository.updateOne(id, warehouse, warehouseUpdate);
    } catch (error) {
      throw new UnprocessableEntityException('Dữ liệu không hợp lệ');
    }
  }

  async deleteById(id: string) {
    const warehouse = await this.findById(id);
    await this.repository.deleteOne(warehouse._id.toHexString());
    return warehouse;
  }

  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'warehouse id');

    const warehouse = await this.repository.updateStatusById(id, status);
    if (!warehouse) {
      throw new NotFoundException('Không tìm thấy kho hàng');
    }
    return warehouse;
  }

  findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';

    return this.repository.findAll(page, limit, newSort, keyword);
  }

  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}
