import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterCustomerDto, RegisterStaffDto } from './dto/register.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admins/login')
  loginUser(@Body() login: LoginDto) {
    return this.authService.validateAdmin(login);
  }

  // dang nhap customer
  @Post('customers/login')
  loginCustomer(@Body() login: LoginDto) {
    return this.authService.validateCustomer(login);
  }

  @Post('staffs/login')
  loginStaff(@Body() login: LoginDto) {
    return this.authService.validateStaff(login);
  }

  @Post('customers/register')
  registerCustomer(@Body() registerDto: RegisterCustomerDto) {
    return this.authService.registerCustomer(registerDto);
  }

  @Post('staffs/register')
  registerStaff(@Body() registerDto: RegisterStaffDto) {
    return this.authService.registerStaff(registerDto);
  }
}
