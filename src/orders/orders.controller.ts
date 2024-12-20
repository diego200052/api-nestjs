import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Types } from 'mongoose';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { OrdersService } from './orders.service';
import { Orders } from './schema/orders.schema';
import { CreateOrderDto, StatusOrderDto, UpdateOrderDto } from './dto/orders.dto';

@Controller('orders')
export class OrdersController {

    constructor(private ordersService: OrdersService) {}

    // Get all Orders (Read)
    @Get()
    async getAll(): Promise<Orders[]> {
        return this.ordersService.findAll();
    }

    // Get order by Id (Read)
    @Get(':id')
    async findById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId
    ) {
        return this.ordersService.findById(id);
    }

    // Get all orders from an user (Read)
    @Get('user/:userId')
    async findAllFromUserById(
        @Param('userId', ValidateObjectIdPipe)
        userId: Types.ObjectId
    ) {
        return this.ordersService.findAllFromUserById(userId);
    }

    // Create a new order (Create)
    @Post()
    async create(
        @Body()
        order: CreateOrderDto
    ): Promise<Orders> {
      return this.ordersService.create(order);
    }

    // Delete order by Id (Delete)
    @Delete(':id')
    async deleteById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId
    ): Promise<Orders> {
      return this.ordersService.deleteById(id);
    }

    // Update order by Id (Update)
    @Patch(':id')
    async updateById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId,
        @Body()
        updateData: Partial<UpdateOrderDto>,
    ): Promise<Orders> {
      return this.ordersService.updateById(id, updateData);
    }

    // Update status of an order by Id (Update)
    @Patch('status/:id')
    async updateStatusById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId,
        @Body()
        status: StatusOrderDto,
    ): Promise<Orders> {
      return this.ordersService.updateStatusById(id, status);
    }

}
