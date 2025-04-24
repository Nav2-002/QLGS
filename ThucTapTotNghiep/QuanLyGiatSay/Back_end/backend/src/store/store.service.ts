import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create_store.dto';
import { UpdateStoreDto } from './dto/update_store.dto';
import { StoreRepository } from './store.repository';
import { buildPagination, checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Injectable()
export class StoreService {
  constructor(private readonly repository: StoreRepository) {}

  /**
   * Tạo mới một cửa hàng.
   * @param createStoreDto Dữ liệu tạo mới cửa hàng.
   * @returns Cửa hàng đã được tạo.
   * @throws UnprocessableEntityException Nếu có lỗi xảy ra trong quá trình tạo.
   */
  async createStore(createStoreDto: CreateStoreDto) {
    const { name, phoneNumber, address, status, id_manager } =
      createStoreDto;

    try {
      if (id_manager) {
        checkValisIsObject(id_manager, 'id_manager');
        // Bạn có thể muốn xác thực xem nhân viên này có tồn tại không, tương tự như ví dụ trước.
      }
      return await this.repository.create({
        name,
        phoneNumber,
        address,
        status,
        id_manager,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  /**
   * Tìm một cửa hàng theo ID.
   * @param id ID của cửa hàng cần tìm.
   * @returns Cửa hàng nếu tìm thấy.
   * @throws NotFoundException Nếu không tìm thấy cửa hàng.
   */
  async findById(id: string) {
    checkValisIsObject(id, 'store id');
    const store = await this.repository.findOne(id);
    if (!store) {
      throw new NotFoundException('không tìm thấy cửa hàng');
    }

    return store;
  }

  /**
   * Cập nhật thông tin của một cửa hàng theo ID.
   * @param id ID của cửa hàng cần cập nhật.
   * @param storeUpdate Dữ liệu cập nhật cửa hàng.
   * @returns Cửa hàng đã được cập nhật.
   * @throws UnprocessableEntityException Nếu có lỗi xảy ra trong quá trình cập nhật.
   */
  async updateById(id: string, storeUpdate: UpdateStoreDto) {
    const { name, phoneNumber, address, status, id_manager } =
      storeUpdate;

    const store = await this.findById(id); // Lấy thông tin cửa hàng hiện tại

    try {
      if (id_manager) {
        checkValisIsObject(id_manager, 'id_manager');
        // Bạn có thể muốn xác thực xem nhân viên này có tồn tại không, tương tự như ví dụ trước.
      }

      return await this.repository.updateOne(id, store, {
        name,
        phoneNumber,
        address,
        status,
        id_manager,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
    }
  }

  /**
   * Xóa một cửa hàng theo ID.
   * @param id ID của cửa hàng cần xóa.
   * @returns Cửa hàng đã bị xóa.
   * @throws NotFoundException Nếu không tìm thấy cửa hàng.
   */
  async deleteById(id: string) {
    const store = await this.findById(id); // Lấy thông tin cửa hàng để kiểm tra sự tồn tại
    await this.repository.deleteOne(store._id.toHexString());

    return store;
  }

  /**
   * Cập nhật trạng thái của một cửa hàng theo ID.
   * @param id ID của cửa hàng cần cập nhật trạng thái.
   * @param status Trạng thái mới của cửa hàng.
   * @returns Cửa hàng đã được cập nhật trạng thái.
   * @throws NotFoundException Nếu không tìm thấy cửa hàng.
   */
  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'store id');

    const store = await this.repository.updateStatusById(id, status);
    if (!store) {
      throw new NotFoundException('không tìm thấy id cửa hàng');
    }

    return store;
  }

  /**
   * Lấy danh sách cửa hàng dựa trên các tham số phân trang.
   * @param params Các tham số phân trang.
   * @returns Danh sách cửa hàng đã phân trang.
   */
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';

    const stores = await this.repository.findAll(page, limit, newSort, keyword);

    // Lấy tất cả các cửa hàng để tính tổng số lượng
    const allStores = await this.repository.findAll(1, 0, newSort, keyword);

    return buildPagination(allStores, params, stores);
  }

  /**
   * Lấy danh sách tất cả các cửa hàng (chỉ lấy tên).
   * @returns Danh sách tất cả các cửa hàng.
   */
  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}

