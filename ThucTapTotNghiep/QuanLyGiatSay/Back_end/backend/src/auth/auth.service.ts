import { CustomerRepository } from './../customer/customer.repository';
import { Role } from './decorator/role.enum';
import { LoginDto } from './dto/login.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { AdminRepository } from 'src/admin/admin.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminRepository: AdminRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async validateUser(login: LoginDto) {
    const { email, password } = login;
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) {
      throw new NotFoundException('Không tìm thấy user');
    }

    if (admin.status === false) {
      throw new UnauthorizedException('Tài khoản đã bị khoá');
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

    if (customer.role === 'customer') {
      throw new UnauthorizedException('Tài khoản đã bị khoá');
    }

    const body: TokenPayloadDto = {
      _id: customer._id.toHexString(),
      email: customer.email || '',
      name: customer.name,
    };
    return this.jwtService.signAsync(body);
  }
}
