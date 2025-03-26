import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
// import { Roles } from 'src/auth/decorator/role.decorator';
// import { Role } from 'src/auth/decorator/role.enum';
// import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
// import { RoleAuthGuard } from 'src/auth/guards/role-jwt.guard';
import { CreateMembershipCardDto } from './dto/create_membership_card.dto';
import { UpdateMembershipCardDto } from './dto/update_membership_card.dto';
import { MembershipCard } from 'src/membership_card/model/membership_card.schema';
import { MembershipCardService } from './membership_card.service';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

// @UseGuards(JwtAuthGuard, RoleAuthGuard)
// @Roles(Role.ADMIN, Role.USER)
@Controller('membership_cards')
export class MembershipCardController {
  constructor(private readonly membershipCardService: MembershipCardService) {}

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get('all')
  getAllGetName() {
    return this.membershipCardService.findAllGetName();
  }

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const membershipCards = await this.membershipCardService.findAll(params);

      const rootMembershipCards = membershipCards.filter((membershipCard) => {
      return membershipCard.id_khachhang === null;
    });

    return buildPagination<MembershipCard>(membershipCards, params, rootMembershipCards);
  }

  // @UseGuards(JwtAuthGuard, RoleAuthGuard)
  // @Roles(Role.ADMIN)
  @Post('')
  async create(@Body() membershipCard: CreateMembershipCardDto) {
    const newMembershipCard = await this.membershipCardService.createMembershipCard(membershipCard);
    return {
      message: 'Tạo thẻ thành viên thành công.',
      membershipCard: newMembershipCard,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.membershipCardService.findById(id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() membershipCard: UpdateMembershipCardDto) {
    const updatedMembershipCard = await this.membershipCardService.updateById(id, membershipCard);
    return {
      message: `Cập nhật thông tin thẻ thành viên thành công.`,
      updatedMembershipCard,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.membershipCardService.deleteById(id);
    return {
      message: `Xóa thẻ thành viên có ID thành công.`,
      deletedId: id,
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN, Role.USER)
  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Query('status') status: boolean) {
    const updatedStatus = await this.membershipCardService.updateStatusById(id, status);
    return {
      message: `Cập nhật trạng thái thẻ thành viên thành công.`,
      updatedStatus,
    };
  }
}