import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Trucks } from './schema/trucks.schema';
import { CreateTruckDto } from './dto/trucks.dto';

@Injectable()
export class TrucksService {

    constructor(
        @InjectModel(Trucks.name)
        private trucksModel: mongoose.Model<Trucks>,
    ) { }

    // Get all trucks (Read)
    async findAll(): Promise<Trucks[] | []> {
        return await this.trucksModel.find()
    }

    // Get truck by Id (Read)
    async findById(id: Types.ObjectId): Promise<Trucks | null> {
        return await this.trucksModel.findById(id).exec();
    }

    // Get all trucks from an user (Read)
    async findAllFromUserById(userId: Types.ObjectId): Promise<Trucks[] | []> {
        const trucks = await this.trucksModel.find({ user: userId }).exec();
        if (!trucks || trucks.length === 0) {
            throw new NotFoundException('Trucks not found for the specified user.');
        }
        return trucks;
    }

    // Delete truck by Id (Delete)
    async deleteById(truckId: Types.ObjectId): Promise<Trucks | null> {
        // Find the truck by Id and delete it
        const result = await this.trucksModel.findByIdAndDelete(truckId);
        if (!result) {
            throw new ConflictException('Truck not found.');
        }
        return result
    }

    // Register new truck (Create)
    async register(truck: CreateTruckDto) {

        // Define the new truck
        const newTruck = new this.trucksModel({
            user: new Types.ObjectId(truck.user),
            year: truck.year,
            color: truck.color,
            plates: truck.plates
        });
              
        //Return the truck created
        return newTruck.save();
    }

    // Update truck by Id (Update)
    async updateById(truckId: Types.ObjectId, updateData: Partial<CreateTruckDto>): Promise<Trucks> {
        
        // Find the truck and update.
        const updatedTruck = await this.trucksModel.findByIdAndUpdate(
            truckId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        // If the truck is not found, return an exception.
        if (!updatedTruck) {
            throw new NotFoundException('Truck not found.');
        }

        // Return the updated truck.
        return updatedTruck;
    }
      
}

