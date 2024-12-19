import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    // Function to Sing in an user
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
}
