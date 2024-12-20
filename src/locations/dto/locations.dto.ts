import { PartialType, PickType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class LocationsDto {

    @IsNotEmpty()
    readonly _id: Types.ObjectId;

    @IsNotEmpty()
    readonly address: string;

    @IsNotEmpty()
    readonly place_id: string;

    @IsNotEmpty()
    readonly latitude: number;

    @IsNotEmpty()
    readonly longitude: number;
}

export class CreateLocationDto extends PickType(LocationsDto, ['place_id'] as const) {}
export class UpdateLocationDto extends PartialType(PickType(LocationsDto, ['address', 'place_id', 'latitude', 'longitude'] as const)) {}