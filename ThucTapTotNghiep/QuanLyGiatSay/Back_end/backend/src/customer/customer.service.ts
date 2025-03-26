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

@Injectable()
export class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const { ten, sodienthoai, email, diachi, ngay_sinh, loai_khach, mat_khau } =
      createCustomerDto;

    try {

      return await this.repository.create({
        ten,
        sodienthoai,
        email,
        diachi,
        ngay_sinh,
        mat_khau,
        loai_khach,
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
    const { ten, sodienthoai, email, diachi, ngay_sinh, loai_khach } =
      customerUpdate;

    const customer = await this.findById(id);

    try {

      return await this.repository.updateOne(id, customer, {
        ten,
        sodienthoai,
        email,
        diachi,
        ngay_sinh,
        loai_khach,
      });
    } catch (error) {
      throw new UnprocessableEntityException('Tên đã tồn tại');
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