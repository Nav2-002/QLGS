import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePromotionDto } from './dto/create_promotion.dto';
import { UpdatePromotionDto } from './dto/update_promotion.dto';
import { Promotion } from 'src/promotion/model/promotion.schema';
import { PromotionService } from './promotion.service';
import { ParamPaginationDto } from '../common/param-pagination.dto';
import { buildPagination } from '../common/common';

@Controller('promotions') // Đã sửa decorator của controller
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  async create(@Body() createPromotionDto: CreatePromotionDto) { // Đã thêm @Body()
    const newPromotion = await this.promotionService.createPromotion(createPromotionDto);
    return {
      message: 'Tạo khuyến mãi thành công.',
      promotion: newPromotion,
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) { // Đã thêm @Param
    return this.promotionService.findById(id);
  }

  @Get()
  async getAll(@Query() query: ParamPaginationDto) { // Đã thêm @Query
    return this.promotionService.findAll(query);
  }


  @Patch(':id')
  async updatePromotion( // Đã sửa tên method thành updatePromotion
    @Param('id') id: string,  // Đã thêm @Param
    @Body() updatePromotionDto: UpdatePromotionDto, // Đã thêm @Body
  ) {
    const updatedPromotion = await this.promotionService.updateById(id, updatePromotionDto);
    return {
      message: 'Cập nhật thông tin khuyến mãi thành công.',
      updatedPromotion,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) { // Đã thêm @Param
    await this.promotionService.deleteById(id);
    return {
      message: 'Xóa khuyến mãi thành công.',
      deletedId: id,
    };
  }
}

