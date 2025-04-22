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
export class PromotionController {
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
