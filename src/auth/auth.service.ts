import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { Users } from 'src/users/schema/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    // Function to Sing-in an user
    async signIn(email: string, pass: string): Promise<any> {

        // Find the user by email
        const user = await this.usersService.findByEmail(email);

        // Hash password and compare
        const isMatch = await bcrypt.compare(pass, user?.password);

        // Unauthorized, passwords doesn't match
        if (!isMatch) {
            throw new UnauthorizedException();
        }

        // Successful login, generate and return JWT with custom payload.
        const payload = { sub: user._id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    // Register a new user into the database
    async register(user: CreateUserDto): Promise<Users> {
    
        // Check if the user already exists in the database
        const existingUser = await this.usersService.findByEmail(user.email);
        if (existingUser) {
          throw new ConflictException('User with this email already exists.');
        }
    
        // Create the user
        return await this.usersService.register(user);

    }
}
