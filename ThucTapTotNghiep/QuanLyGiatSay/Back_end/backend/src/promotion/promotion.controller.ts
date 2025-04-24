import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { PromotionService } from './promotion.service'; 
import { CreatePromotionDto } from './dto/create_promotion.dto'; 
import { UpdatePromotionDto } from './dto/update_promotion.dto'; 
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Controller('promotions')
export class PromotionController {import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { PromotionService } from './promotion.service';        // Service xử lý logic khuyến mãi
import { CreatePromotionDto } from './dto/create_promotion.dto';      // DTO tạo mới khuyến mãi
import { UpdatePromotionDto } from './dto/update_promotion.dto';      // DTO cập nhật khuyến mãi
import { ParamPaginationDto } from 'src/common/param-pagination.dto';      // DTO phân trang

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  /**
   * Tạo mới khuyến mãi.
   * @param createPromotionDto Dữ liệu tạo mới khuyến mãi.
   * @returns Khuyến mãi đã được tạo.
   * @throws BadRequestException nếu có lỗi trong quá trình tạo.
   */
  @Post()
  async create(@Body() createPromotionDto: CreatePromotionDto) {
    try {
      return await this.promotionService.createPromotion(createPromotionDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Lấy danh sách khuyến mãi (có phân trang).
   * @param query Các tham số phân trang.
   * @returns Danh sách khuyến mãi đã phân trang.
   */
  @Get()
  async getAll(@Query() query: ParamPaginationDto) {
    return this.promotionService.findAll(query);
  }

  /**
   * Lấy thông tin khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @returns Khuyến mãi.
   */
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.promotionService.findById(id);
  }

  /**
   * Cập nhật thông tin khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @param updatePromotionDto Dữ liệu cập nhật khuyến mãi.
   * @returns Khuyến mãi đã được cập nhật.
   */
  @Patch(':id')
  async updatePromotion(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionService.updateById(id, updatePromotionDto);
  }

  /**
   * Xóa khuyến mãi theo ID.
   * @param id ID của khuyến mãi.
   * @returns Kết quả của thao tác xóa.
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.promotionService.deleteById(id);
  }
}


  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  async create(@Body() createPromotionDto: CreatePromotionDto) {
    try {
      return await this.promotionService.createPromotion(createPromotionDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async getAll(@Query() query: ParamPaginationDto) {
    return this.promotionService.findAll(query);
  }
  

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.promotionService.findById(id);
  }

  @Patch(':id')
  async updatePromotion(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    return this.promotionService.updateById(id, updatePromotionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.promotionService.deleteById(id);
  }
}
