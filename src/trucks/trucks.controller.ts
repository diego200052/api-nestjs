import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Types } from 'mongoose';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { Trucks } from './schema/trucks.schema';
import { TrucksService } from './trucks.service';
import { CreateTruckDto, UpdateTruckDto } from './dto/trucks.dto';

@Controller('trucks')
export class TrucksController {
    constructor(private trucksService: TrucksService) {}

    // Get all trucks (Read)
    @Get()
    async getAll(): Promise<Trucks[]> {
        return this.trucksService.findAll();
    }

    // Get truck by Id (Read)
    @Get(':id')
    async findById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId
    ) {
        return this.trucksService.findById(id);
    }

    // Get all trucks from an user (Read)
    @Get('user/:userId')
    async findAllFromUserById(
        @Param('userId', ValidateObjectIdPipe)
        userId: Types.ObjectId
    ) {
        return this.trucksService.findAllFromUserById(userId);
    }

    // Register new truck (Create)
    @Post()
    async create(
        @Body()
        truck: CreateTruckDto
    ): Promise<Trucks> {
      return this.trucksService.register(truck);
    }

    // Delete truck by Id (Delete)
    @Delete(':id')
    async deleteById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId
    ): Promise<Trucks> {
      return this.trucksService.deleteById(id);
    }

    // Update truck by Id (Update)
    @Patch(':id')
    async updateById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId,
        @Body()
        updateData: Partial<UpdateTruckDto>,
    ): Promise<Trucks> {
      return this.trucksService.updateById(id, updateData);
    }

}
