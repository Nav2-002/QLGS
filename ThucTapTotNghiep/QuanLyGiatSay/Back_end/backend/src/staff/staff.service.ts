import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create_staff.dto';
import { UpdateStaffDto } from './dto/update_staff.dto';
import { StaffRepository } from './staff.repository';
import { checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import * as bcrypt from 'bcrypt'; // Import bcrypt

@Injectable()
export class StaffService {
  constructor(private readonly repository: StaffRepository) {}

  /**
   * Tạo mới nhân viên.
   * @param createStaffDto Dữ liệu tạo mới nhân viên.
   * @returns Nhân viên đã được tạo (có mật khẩu đã mã hóa).
   * @throws UnprocessableEntityException nếu có lỗi xảy ra trong quá trình tạo.
   */
  async createStaff(createStaffDto: CreateStaffDto) {
    const { id_store, name, phoneNumber, email, role, password, status } = createStaffDto;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      if (id_store) {
        checkValisIsObject(id_store, 'id_store');
        // Bạn có thể muốn xác thực xem cửa hàng có tồn tại ở đây.
      }
      return await this.repository.create({
        id_store,
        name,
        phoneNumber,
        email,
        role,
        password: hashedPassword, // Lưu mật khẩu đã băm,
        status
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  /**
   * Tìm nhân viên theo ID.
   * @param id ID của nhân viên cần tìm.
   * @returns Nhân viên nếu tìm thấy.
   * @throws NotFoundException nếu không tìm thấy nhân viên.
   */
  async findById(id: string) {
    checkValisIsObject(id, 'staff id');
    const staff = await this.repository.findOne(id);
    if (!staff) {
      throw new NotFoundException('không tìm thấy nhân viên');
    }
    return staff;
  }

  /**
   * Cập nhật thông tin nhân viên theo ID.
   * @param id ID của nhân viên cần cập nhật.
   * @param staffUpdate Dữ liệu cập nhật nhân viên.
   * @returns Nhân viên đã được cập nhật.
   * @throws UnprocessableEntityException nếu có lỗi xảy ra trong quá trình cập nhật.
   */
  async updateById(id: string, staffUpdate: UpdateStaffDto) {
    const { id_store, name, phoneNumber, email, password } = staffUpdate;
    let hashedPassword: string | undefined = undefined;

    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const staff = await this.findById(id); // Lấy thông tin nhân viên cũ

    try {
      if (id_store) {
        checkValisIsObject(id_store, 'id_store');
        // Bạn có thể muốn xác thực xem cửa hàng có tồn tại ở đây.
      }

      return await this.repository.updateOne(id, staff, {
        id_store,
        name,
        phoneNumber,
        email,
        password: hashedPassword !== undefined ? hashedPassword : staff.password, // Sử dụng mật khẩu mới nếu có, nếu không giữ nguyên
      });
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
    }
  }

  /**
   * Xóa nhân viên theo ID.
   * @param id ID của nhân viên cần xóa.
   * @returns Nhân viên đã bị xóa.
   * @throws NotFoundException nếu không tìm thấy nhân viên.
   */
  async deleteById(id: string) {
    const staff = await this.findById(id); // Lấy thông tin nhân viên để kiểm tra tồn tại
    await this.repository.deleteOne(staff._id.toHexString());
    return staff;
  }

  /**
   * Cập nhật trạng thái của nhân viên theo ID.
   * @param id ID của nhân viên cần cập nhật trạng thái.
   * @param status Trạng thái mới (true hoặc false).
   * @returns Nhân viên đã được cập nhật trạng thái.
   * @throws NotFoundException nếu không tìm thấy nhân viên.
   */
  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'staff id');
    const updatedStaff = await this.repository.updateStatusById(id, status);
    if (!updatedStaff) {
      throw new NotFoundException('không tìm thấy id nhân viên');
    }
    return updatedStaff;
  }
  /**
    * Lấy thông tin nhân viên theo ID, không bao gồm mật khẩu.
    * @param id ID của nhân viên cần lấy.
    * @returns Nhân viên nếu tìm thấy.
    * @throws UnauthorizedException nếu không tìm thấy nhân viên.
    */
  async getOne(id: string) {
    const staff = await this.repository.findMe(id, '-password');
    if (!staff) {
      throw new UnauthorizedException('Không tìm thấy staff');
    }
    return staff;
  }
  /**
   * Lấy danh sách nhân viên có phân trang và tìm kiếm.
   * @param params Các tham số phân trang và tìm kiếm.
   * @returns Danh sách nhân viên đã phân trang.
   */
  findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort != 'asc' ? 'desc' : 'asc';
    return this.repository.findAll(page, limit, newSort, keyword);
  }

  /**
   * Lấy danh sách tất cả nhân viên (chỉ lấy các trường không nhạy cảm).
   * @returns Danh sách tất cả nhân viên.
   */
  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}

