import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Types } from 'mongoose';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { LocationsService } from './locations.service';
import { Locations } from './schema/locations.schema';
import { CreateLocationDto, UpdateLocationDto } from './dto/locations.dto';

@Controller('locations')
export class LocationsController {
    constructor(private locationsService: LocationsService) {}

    // Get all locations (Read)
    @Get()
    async getAll(): Promise<Locations[]> {
        return this.locationsService.findAll();
    }

    // Get location by Id (Read)
    @Get(':id')
    async findById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId
    ) {
        return this.locationsService.findById(id);
    }

    // Get location by place_id (Read)
    @Get('place/:placeId')
    async findAllFromUserById(
        @Param('placeId')
        placeId: string
    ) {
        return this.locationsService.findByPlaceId(placeId);
    }

    // Register new location by place_id (Create)
    @Post()
    async create(
        @Body()
        location: CreateLocationDto
    ): Promise<Locations> {
      return this.locationsService.create(location);
    }

    // Delete location by Id (Delete)
    @Delete(':id')
    async deleteById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId
    ): Promise<Locations> {
      return this.locationsService.deleteById(id);
    }

    // Update location by Id (Update)
    @Patch(':id')
    async updateById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId,
        @Body()
        updateData: Partial<UpdateLocationDto>,
    ): Promise<Locations> {
      return this.locationsService.updateById(id, updateData);
    }

}