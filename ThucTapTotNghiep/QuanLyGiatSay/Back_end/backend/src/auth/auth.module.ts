import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Customer } from 'src/customer/model/customer.schema';
import { CustomerModule } from 'src/customer/customer.module';
import { CustomerRepository } from 'src/customer/customer.repository';
import { AdminModule } from 'src/admin/admin.module';
import { AdminRepository } from 'src/admin/admin.repository';
import { StaffModule } from 'src/staff/staff.module';
@Module({
  imports: [
    AdminModule,         // đã export AdminRepository rồi
    CustomerModule,      // đã export CustomerRepository rồi
    StaffModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret:
          'vVarX3ETLuR35pAe8LLVSEieaIxvBrz6X2B0eiN1HY4cdf3jYwBUKISJhDDXD60gsZiL9HLTYPoVwrSGa628XGmjJkGF04J3f4On',
        signOptions: {
          expiresIn: '24h',
          algorithm: 'HS256',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],   // chỉ để những service thực sự cần khai báo
})
export class AuthModule {}
