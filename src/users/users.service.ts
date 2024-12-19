import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import mongoose, { Types } from 'mongoose';
import { CreateUserDto, UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name)
        private usersModel: mongoose.Model<Users>,
        private readonly configService: ConfigService,
    ) {
        // Bcrypt hash settings
        const saltIt = this.configService.get<string>('BCRYPT_SALTIT');
        this.saltIt = saltIt ? parseInt(saltIt, 10) : 10;
    }

    private saltIt: number;

    // Get all users (Read)
    async findAll(): Promise<Users[]> {
        return await this.usersModel.find()
    }

    // Get user by Id (Read)
    async findById(id: Types.ObjectId): Promise<Users | null> {
        return await this.usersModel.findById(id).exec();
    }

    // Get user by email (Read)
    async findByEmail(email: string): Promise<Users | null> {
        const user = await this.usersModel.findOne({ email }).exec();
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    // Delete user by Id (Delete)
    async deleteById(userId: Types.ObjectId): Promise<Users | null> {
        // Find the user by Id and delete it
        const result = await this.usersModel.findByIdAndDelete(userId);
        if (!result) {
            throw new ConflictException('User not found.');
        }
        return result
    }

    // Register user (Create)
    async register(user: CreateUserDto) {

        // Hash password with an encryption algorithm
        const hashedPassword = await bcrypt.hash(user.password, this.saltIt);

        // Define the new user
        const newUser = new this.usersModel({
            email: user.email,
            password: hashedPassword,
        });
              
        //Return the user created
        return newUser.save();
    }

    // Update user by Id (Update)
    async updateById(userId: Types.ObjectId, updateData: Partial<CreateUserDto>): Promise<Users> {

        const mutableData = { ...updateData };

        // If we need to update the password
        if(mutableData.password) {
            // Hash password and update it
            const hashedPassword = await bcrypt.hash(mutableData.password, this.saltIt);
            mutableData.password = hashedPassword;
        }
        
        // Find the user and update.
        const updatedUser = await this.usersModel.findByIdAndUpdate(
            userId,
            { $set: mutableData },
            { new: true, runValidators: true }
        );

        // If the user is not found, return an exception.
        if (!updatedUser) {
            throw new NotFoundException('User not found.');
        }

        // Return the updated user.
        return updatedUser;
    }
      
}
