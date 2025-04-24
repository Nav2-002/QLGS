import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create_customer.dto';      // DTO cho tạo mới Customer
import { UpdateCustomerDto } from './dto/update_customer.dto';      // DTO cho cập nhật Customer
import { CustomerRepository } from './customer.repository';              // Repository Customer
import { checkValisIsObject } from 'src/common/common';            // Hàm tiện ích (kiểm tra object ID)
import { ParamPaginationDto } from 'src/common/param-pagination.dto'; // DTO cho phân trang
import * as bcrypt from 'bcrypt';         // Thư viện băm mật khẩu

@Injectable()
export class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}

  /**
   * Tạo mới Customer.
   * Băm mật khẩu trước khi lưu.
   */
  async createCustomer(createCustomerDto: CreateCustomerDto) {
    console.log('Data received for createCustomer:', createCustomerDto);
    const {
      name,
      phoneNumber,
      email,
      address,
      birth_day,
      customer_type,
      password,
      role,
    } = createCustomerDto;

    const saltRounds = 10; // Số lượng salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Băm mật khẩu

    try {
      return await this.repository.create({
        name,
        phoneNumber,
        email,
        address,
        birth_day,
        password: hashedPassword, // Lưu mật khẩu đã băm
        customer_type,
        role,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  /**
   * Tìm Customer theo ID.
   * Kiểm tra tính hợp lệ của ID và sự tồn tại của Customer.
   */
  async findById(id: string) {
    checkValisIsObject(id, 'customer id');
    const customer = await this.repository.findOne(id);
    if (!customer) {
      throw new NotFoundException('không tìm thấy khách hàng');
    }

    return customer;
  }

  /**
   * Cập nhật thông tin Customer theo ID.
   * Băm mật khẩu mới nếu được cung cấp.
   */
  async updateById(id: string, customerUpdate: UpdateCustomerDto) {
    const {
      name,
      phoneNumber,
      email,
      address,
      birth_day,
      customer_type,
      password,
      role,
    } = customerUpdate;

    const customer = await this.findById(id); // Lấy thông tin customer cũ
    let hashedPassword: string | undefined = undefined; // Để lưu mật khẩu đã băm

    if (password) { // Nếu có mật khẩu mới
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds); // Băm mật khẩu
    }

    try {
      return await this.repository.updateOne(id, customer, {
        name,
        phoneNumber,
        email,
        address,
        birth_day,
        password:
          hashedPassword !== undefined ? hashedPassword : customer.password, // Lưu mật khẩu đã băm (nếu có thay đổi), nếu không giữ nguyên mật khẩu cũ
        customer_type,
        role,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Lỗi khi cập nhật khách hàng');
    }
  }

  /**
   * Xóa Customer theo ID.
   */
  async deleteById(id: string) {
    const customer = await this.findById(id); // Lấy thông tin customer để trả về
    await this.repository.deleteOne(customer._id.toHexString()); // Xóa theo _id
    return customer; // Trả về thông tin của customer đã xóa
  }

  /**
   * Lấy danh sách Customer có phân trang, sắp xếp và tìm kiếm.
   */
  findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;
    const newSort = sort != 'asc' ? 'desc' : 'asc';
    return this.repository.findAll(page, limit, newSort, keyword);
  }

  /**
   * Lấy danh sách tất cả Customer (chỉ lấy tên).
   */
  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}
