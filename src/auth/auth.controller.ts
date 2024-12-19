import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/user.dto';
import { Users } from 'src/users/schema/users.schema';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body()
        user: LoginUserDto
    ) {
        return this.authService.signIn(user.email, user.password);
    }

    @Public()
    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto
    ): Promise<Users> {
      return this.authService.register(createUserDto);
    }

}
