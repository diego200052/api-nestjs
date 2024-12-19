import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './schema/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<Users[]> {
        return this.usersService.findAll();
    }

    @Get(':email')
    async getUser(
        @Param('email')
        email: string,
    ): Promise<Users> {
        return this.usersService.findByEmail(email);
    }

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto
    ): Promise<Users> {
      return this.usersService.register(createUserDto);
    }

}
