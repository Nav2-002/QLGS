import { CustomerRepository } from './../customer/customer.repository';
import { Role } from './decorator/role.enum';
import { LoginDto } from './dto/login.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { AdminRepository } from 'src/admin/admin.repository';
import { StaffRepository } from 'src/staff/staff.repository';
import { RegisterCustomerDto, RegisterStaffDto } from './dto/register.dto';
import { CustomerService } from 'src/customer/customer.service';
import { StaffService } from 'src/staff/staff.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminRepository: AdminRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly staffRepository: StaffRepository,
    private readonly customerService: CustomerService,
    private readonly staffService: StaffService,
  ) {}

  async validateAdmin(login: LoginDto) {
    const { email, password } = login;
    const admin = await this.adminRepository.findByEmail(email);

    console.log('Admin found:', admin); // Thêm log
    console.log('Password from DTO:', password); // Thêm log

    if (!admin) {
      throw new NotFoundException('Không tìm thấy admin');
    }

    if (admin.status === false) {
      throw new UnauthorizedException('Tài khoản đã bị khoá');
    }

    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai mật khẩu');
    }

    const body: TokenPayloadDto = {
      _id: admin._id.toHexString(),
      email: admin.email || '',
      name: admin.name,
      role: [Role.ADMIN],
    };

    return this.jwtService.signAsync(body);
  }

  async validateCustomer(login: LoginDto) {
    const { email, password } = login;
    const customer = await this.customerRepository.findByEmail(email);
    if (!customer) {
      throw new UnauthorizedException('Không tìm thấy customer');
    }

    const isValid = bcrypt.compareSync(password, customer.password);
    if (!isValid) {
      throw new UnauthorizedException('Sai mật khẩu!');
    }

    if (customer.status === false) {
      throw new UnauthorizedException('Tài khoản đã bị khoá');
    }

    const body: TokenPayloadDto = {
      _id: customer._id.toHexString(),
      email: customer.email || '',
      name: customer.name,
      role: [customer.role],
    };
    return this.jwtService.signAsync(body);
  }
  async validateStaff(login: LoginDto) {
    const { email, password } = login;
    const staff = await this.staffRepository.findByEmail(email);

    if (!staff) {
      throw new NotFoundException('Không tìm thấy nhân viên');
    }

    console.log('Email nhập:', email);
    console.log('Mật khẩu nhập:', password);
    console.log('Mật khẩu database:', staff.password);

    const isMatch = bcrypt.compareSync(password, staff.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai mật khẩu');
    }
    if (staff.status === false) {
      throw new UnauthorizedException('Tài khoản đã bị khoá');
    }

    const body: TokenPayloadDto = {
      _id: staff._id.toHexString(),
      email: staff.email || '',
      name: staff.name,
      role: [staff.role],
    };

    return this.jwtService.signAsync(body);
  }
  async registerCustomer(registerDto: RegisterCustomerDto) {
    const { email } = registerDto;
    const existingCustomer = await this.customerRepository.findByEmail(email);
    if (existingCustomer) {
      throw new BadRequestException('Email đã tồn tại');
    }
    return this.customerService.createCustomer(registerDto);
  }

  async registerStaff(registerDto: RegisterStaffDto) {
    const { email } = registerDto;
    const existingStaff = await this.staffRepository.findByEmail(email);
    if (existingStaff) {
      throw new BadRequestException('Email đã tồn tại');
    }
    return this.staffService.createStaff(registerDto);
  }
}