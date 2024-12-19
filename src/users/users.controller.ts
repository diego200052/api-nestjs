import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './schema/users.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Types } from 'mongoose';
import { ValidateObjectIdPipe } from 'src/pipes/validate-object-id.pipe';
import { ValidateEmailPipe } from './pipes/validate-email.pipe';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<Users[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findById(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId
    ) {
        return this.usersService.findById(id);
    }

    @Get('email/:email')
    async getUserByEmail(
        @Param('email', ValidateEmailPipe)
        email: string,
    ): Promise<Users> {
        return this.usersService.findByEmail(email);
    }

    @Post()
    async create(
        @Body()
        user: CreateUserDto
    ): Promise<Users> {
      return this.usersService.register(user);
    }

    @Delete(':id')
    async delete(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId
    ): Promise<Users> {
      return this.usersService.deleteById(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ValidateObjectIdPipe)
        id: Types.ObjectId,
        @Body()
        updateData: Partial<UpdateUserDto>,
    ): Promise<Users> {
      return this.usersService.updateById(id, updateData);
    }

}
