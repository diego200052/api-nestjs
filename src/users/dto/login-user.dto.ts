import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    readonly password: string;
}