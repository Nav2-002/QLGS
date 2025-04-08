import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create_customer.dto';
import { UpdateCustomerDto } from './dto/update_customer.dto';
import { CustomerRepository } from './customer.repository';
import { checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import * as bcrypt from 'bcrypt'; // Import bcrypt

@Injectable()
export class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const {
      name,
      phoneNumber,
      email,
      address,
      birth_Day,
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
        birth_Day,
        password: hashedPassword, // Lưu mật khẩu đã băm
        customer_type,
        role,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async findById(id: string) {
    checkValisIsObject(id, 'customer id');
    const customer = await this.repository.findOne(id);
    if (!customer) {
      throw new NotFoundException('không tìm thấy khách hàng');
    }

    return customer;
  }

  async updateById(id: string, customerUpdate: UpdateCustomerDto) {
    const {
      name,
      phoneNumber,
      email,
      address,
      birth_Day,
      customer_type,
      password,
      role,
    } = customerUpdate;

    const customer = await this.findById(id);
    let hashedPassword: string | undefined = undefined;

    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    try {
      return await this.repository.updateOne(id, customer, {
        name,
        phoneNumber,
        email,
        address,
        birth_Day,
        password: hashedPassword !== undefined ? hashedPassword : customer.password, // Lưu mật khẩu đã băm (nếu có thay đổi)
        customer_type,
        role,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Lỗi khi cập nhật khách hàng');
    }
  }

  async deleteById(id: string) {
    const customer = await this.findById(id);
    await this.repository.deleteOne(customer._id.toHexString());
    return customer;
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