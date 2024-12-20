import { PartialType, PickType } from "@nestjs/mapped-types";
import { IsEmail, IsMongoId, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Types } from "mongoose";

export class UserDto {

    @IsNotEmpty()
    @IsMongoId({ message: '_id must be a valid ObjectId.' })
    readonly _id: Types.ObjectId;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    readonly password: string;
}

export class CreateUserDto extends PickType(UserDto, ['email', 'password'] as const) {}
export class LoginUserDto extends CreateUserDto {}
export class EmailUserDto extends PickType(UserDto, ['email'] as const) {}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
