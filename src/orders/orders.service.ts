import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Orders } from './schema/orders.schema';
import { CreateOrderDto, StatusOrderDto } from './dto/orders.dto';
import { UsersService } from 'src/users/users.service';
import { TrucksService } from 'src/trucks/trucks.service';
import { LocationsService } from 'src/locations/locations.service';

@Injectable()
export class OrdersService {
    
    constructor(
        @InjectModel(Orders.name)
        private ordersModel: mongoose.Model<Orders>,
        private usersService: UsersService,
        private trucksService: TrucksService,
        private locationsService: LocationsService,
    ) { }

    // Get all Orders (Read)
    async findAll(): Promise<Orders[] | []> {
        return await this.ordersModel.find()
    }

    // Get order by Id (Read)
    async findById(id: Types.ObjectId): Promise<Orders | null> {
        return await this.ordersModel.findById(id).exec();
    }

    // Get all orders from an user (Read)
    async findAllFromUserById(userId: Types.ObjectId): Promise<Orders[] | []> {
        const Orders = await this.ordersModel.find({ user: userId }).exec();
        if (!Orders || Orders.length === 0) {
            throw new NotFoundException('Orders not found for the specified user.');
        }
        return Orders;
    }

    // Delete order by Id (Delete)
    async deleteById(truckId: Types.ObjectId): Promise<Orders | null> {
        // Find the order by Id and delete it
        const result = await this.ordersModel.findByIdAndDelete(truckId);
        if (!result) {
            throw new NotFoundException('Order not found.');
        }
        return result
    }

    // Create a new order (Create)
    async create(order: CreateOrderDto) {

        // Verify that the user exists in the database
        const userExists = await this.usersService.findById(order.user);
        if (!userExists) {
            throw new NotFoundException('User not found.');
        }

        // If truck was provided, verify that the truck exists in the database
        if (order.truck) {
            const truckExists = await this.trucksService.findById(order.truck);
            if (!truckExists) {
                throw new NotFoundException('Truck not found.');
            }
        }

        // If pickup was provided, verify that the locations exists in the database
        if (order.pickup) {
            const isValidPickup = await this.locationsService.findById(order.pickup);
            if (!isValidPickup) {
                throw new NotFoundException('Pickup location not found.');
            }
        }

        // If dropoff was provided, verify that the locations exists in the database
        if (order.dropoff) {
            const isValidDropoff = await this.locationsService.findById(order.dropoff);
            if (!isValidDropoff) {
                throw new NotFoundException('Dropoff location not found.');
            }
        }

        // Define the new order
        const newOrder = new this.ordersModel({
            user: new Types.ObjectId(order.user),
            truck: order.truck ? new Types.ObjectId(order.truck) : undefined,
            status: order.status ? order.status : "created",
            pickup: order.pickup ? new Types.ObjectId(order.pickup) : undefined,
            dropoff: order.dropoff ? new Types.ObjectId(order.dropoff) : undefined,
        });
              
        //Return the order created
        return newOrder.save();
    }

    // Update order by Id (Update)
    async updateById(orderId: Types.ObjectId, updateData: Partial<CreateOrderDto>): Promise<Orders> {
        
        // Find the truck and update.
        const updatedOrder = await this.ordersModel.findByIdAndUpdate(
            orderId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        // If the order is not found, return an exception.
        if (!updatedOrder) {
            throw new NotFoundException('Order not found.');
        }

        // Return the updated truck.
        return updatedOrder;
    }

    // Update status of an order by Id (Update)
    async updateStatusById(orderId: Types.ObjectId, status: Partial<StatusOrderDto>): Promise<Orders> {
        
        // Find the order and update.
        const updatedOrder = await this.ordersModel.findByIdAndUpdate(
            orderId,
            { $set: status },
            { new: true, runValidators: true }
        );

        // If the order is not found, return an exception.
        if (!updatedOrder) {
            throw new NotFoundException('Order not found.');
        }

        // Return the updated truck.
        return updatedOrder;
    }
      
}

