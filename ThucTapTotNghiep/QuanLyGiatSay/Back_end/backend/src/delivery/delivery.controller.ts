import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateDeliveryDto } from './dto/create_delivery.dto';
import { Delivery } from './model/delivery.schema';
import { DeliveryService } from './delivery.service';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { buildPagination } from 'src/common/common';

@Controller('deliverys')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('')
  async getAll(@Query() query: ParamPaginationDto) {
    return this.deliveryService.findAll(query);
  }

  @Post('')
  async create(@Body() createDeliveryDto: UpdateDeliveryDto) {
    const newDelivery = await this.deliveryService.create(createDeliveryDto);
    return {
      message: 'Delivery created successfully.',
      delivery: newDelivery,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.deliveryService.findById(id);
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    const updatedDelivery = await this.deliveryService.update(id, updateDeliveryDto);
    return {
      message: 'Delivery updated successfully.',
      updatedDelivery,
    };
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.deliveryService.remove(id);
    return {
      message: 'Delivery deleted successfully.',
      deletedId: id,
    };
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Query('status') status: boolean
  ) {
    const updatedStatus = await this.deliveryService.updateStatus(id, status);
    return {
      message: 'Delivery status updated successfully.',
      updatedStatus,
    };
  }
}
