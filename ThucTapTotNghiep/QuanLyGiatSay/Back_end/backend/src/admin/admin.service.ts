import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create_admin.dto';
import { UpdateAdminDto } from './dto/update_admin.dto';
import { AdminRepository } from './admin.repository';
import { buildPagination, checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { UpdateServiceDto } from 'src/service/dto/update_service.dto'; // Import này có vẻ không dùng, nên có thể xóa
import * as bcrypt from 'bcrypt';  // Thư viện để băm mật khẩu

@Injectable()
export class AdminService {
  constructor(private readonly repository: AdminRepository) {}

  /**
   * Tạo mới Admin.
   * Băm mật khẩu trước khi lưu.
   */
  async createAdmin(createAdminDto: CreateAdminDto) {
    const { name, email, password, role } = createAdminDto;
    const saltRounds = 10; // Số lượng salt rounds (nên đặt là 10 trở lên)
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Băm mật khẩu

    try {
      return await this.repository.create({
        name,
        email,
        password: hashedPassword, // Lưu mật khẩu đã băm
        role,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  /**
   * Tìm Admin theo ID.
   * Kiểm tra ID có hợp lệ và Admin có tồn tại.
   */
  async findById(id: string) {
    checkValisIsObject(id, 'admin id');
    const admin = await this.repository.findOne(id);
    if (!admin) {
      throw new NotFoundException('không tìm thấy admin');
    }
    return admin;
  }

  /**
   * Cập nhật thông tin Admin theo ID.
   * Băm mật khẩu mới nếu được cung cấp.
   */
  async updateById(id: string, adminUpdate: UpdateAdminDto) {
    const { ten, email, password, vaitro } = adminUpdate;
    let hashedPassword: string | undefined = undefined; // Khai báo rõ ràng kiểu

    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const service = await this.findById(id); //Dòng này đang lấy service theo id, có thể gây nhầm lẫn. Nên đổi tên biến

    try {
      return await this.repository.updateOne(id, service, { //và truyền admin vào repo
        ten,
        email,
        password: hashedPassword !== undefined ? hashedPassword : service.password, //giữ lại pass cũ nếu không có pass mới
        vaitro,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
    }
  }

  /**
   * Xóa Admin theo ID.
   */
  async deleteById(id: string) {
    const service = await this.findById(id); // Tương tự, đổi tên biến này.
    await this.repository.deleteOne(service._id.toHexString()); //và truyền admin._id

    return service; //và trả về admin
  }

  /**
   * Lấy danh sách Admin có phân trang, sắp xếp và tìm kiếm.
   */
  async findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort !== 'asc' ? 'desc' : 'asc';

    const admins = await this.repository.findAll(page, limit, newSort, keyword);

    // Lấy tất cả laundry_orders để tính total  ->  Đổi thành lấy tất cả admins
    const allAdmins = await this.repository.findAll(1, 0, newSort, keyword);

    return buildPagination(allAdmins, params, admins);
  }

  /**
   * Lấy thông tin một Admin (không lấy password).
   */
  async getOne(id: string) {
    const admin = await this.repository.findMe(id, '-password');
    if (!admin) {
      throw new UnauthorizedException('Không tìm thấy admin');
    }
    return admin;
  }

  /**
   * Lấy danh sách tên tất cả Admin.
   */
  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}
