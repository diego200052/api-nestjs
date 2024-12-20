import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './schema/users.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Users', schema: UsersSchema}]),
        forwardRef(() => AuthModule),
    ],
    controllers: [UsersController],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
