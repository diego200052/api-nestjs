import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users.name)
        private usersModel: mongoose.Model<Users>
    ) {}

    // Bcrypt hash settings
    saltIt: number = 10;

    // Get all users (Read)
    async findAll(): Promise<Users[]> {
        return await this.usersModel.find()
    }

    // Get user by email (Read)
    async findByEmail(email: string): Promise<Users | null> {
        return await this.usersModel.findOne({ email }).exec();
    }

    // Register a new user into the database (Create)
    async register(createUserDto: CreateUserDto): Promise<Users> {
        const { email, password } = createUserDto;
    
        // Check if the user already exists
        const existingUser = await this.usersModel.findOne({ email });
        if (existingUser) {
          throw new ConflictException('User with this email already exists');
        }
    
        // Hash password with an encryption algorithm
        const hashedPassword = await bcrypt.hash(password, this.saltIt);
    
        // Define the new user
        const newUser = new this.usersModel({
          email,
          password: hashedPassword,
        });
    
        //Return the user created
        return newUser.save();
      }
}
