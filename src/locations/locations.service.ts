import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Locations } from './schema/locations.schema';
import { CreateLocationDto } from './dto/locations.dto';
import { GooglePlacesService } from './google-places.service';
import { PlaceDetailsResponseDto } from './interfaces/place-details-response.interface';

@Injectable()
export class LocationsService {

    constructor(
        @InjectModel(Locations.name)
        private locationsModel: mongoose.Model<Locations>,
        private readonly googlePlacesService: GooglePlacesService,
    ) { }

    // Get all locations (Read)
    async findAll(): Promise<Locations[] | []> {
        return await this.locationsModel.find()
    }

    // Get location by Id (Read)
    async findById(id: Types.ObjectId): Promise<Locations | null> {
        return await this.locationsModel.findById(id).exec();
    }

    // Get location by place_id (Read)
    async findByPlaceId(placeId: string): Promise<Locations | null> {
        const location = await this.locationsModel.findOne({ place_id: placeId }).exec();

        if (!location) {
            throw new NotFoundException('Location not found for the specified place ID.');
        }
        return location;
    }

    // Delete location by Id (Delete)
    async deleteById(locationId: Types.ObjectId): Promise<Locations | null> {
        // Find the location by Id and delete it
        const result = await this.locationsModel.findByIdAndDelete(locationId);
        if (!result) {
            throw new NotFoundException('Location not found.');
        }
        return result
    }

    // Register new location by place_id (Create)
    async create(location: CreateLocationDto): Promise<Locations> {
        const { place_id } = location;

        // Check if the address is already in the database
        const existingLocation = await this.locationsModel.findOne({ place_id }).exec();
        if (existingLocation) {
            throw new ConflictException(`Location with place_id ${place_id} already exists.`);
        }
    
        // Get address, lat. and lng. from Google API
        const placeDetails: PlaceDetailsResponseDto = await this.googlePlacesService.getPlaceDetails(place_id);
    
        // Define the new location
        const newLocation = new this.locationsModel({
            address: placeDetails.formatted_address,
            place_id: location.place_id,
            latitude: placeDetails.geometry.location.lat,
            longitude: placeDetails.geometry.location.lng 
        });
              
        //Return the location created
        return newLocation.save();
    }

    // Update location by Id (Update)
    async updateById(locationId: Types.ObjectId, updateData: Partial<CreateLocationDto>): Promise<Locations> {
        
        // Find the location and update.
        const updatedLocation = await this.locationsModel.findByIdAndUpdate(
            locationId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        // If the location is not found, return an exception.
        if (!updatedLocation) {
            throw new NotFoundException('Location not found.');
        }

        // Return the updated location.
        return updatedLocation;
    }
      
}