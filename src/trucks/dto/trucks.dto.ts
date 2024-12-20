import { PartialType, PickType } from "@nestjs/mapped-types";
import { IsEmail, IsMongoId, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Types } from "mongoose";

export class TruckDto {

    @IsNotEmpty()
    @IsMongoId({ message: '_id must be a valid ObjectId.' })
    readonly _id: Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId({ message: 'user must be a valid ObjectId.' })
    readonly user: Types.ObjectId;

    @IsNotEmpty()
    readonly year: string;

    @IsNotEmpty()
    readonly color: string;

    @IsNotEmpty()
    readonly plates: string;
}

export class CreateTruckDto extends PickType(TruckDto, ['user', 'year', 'color', 'plates'] as const) {}
export class UpdateTruckDto extends PartialType(CreateTruckDto) {}