import { PartialType, PickType } from "@nestjs/mapped-types";
import { IsIn, IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import { Types } from "mongoose";

export class OrderDto {

    @IsNotEmpty()
    @IsMongoId({ message: '_id must be a valid ObjectId.' })
    readonly _id: Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId({ message: 'user must be a valid ObjectId.' })
    readonly user: Types.ObjectId;

    @IsOptional()
    @IsMongoId({ message: 'truck must be a valid ObjectId.' })
    readonly truck: Types.ObjectId;

    @IsNotEmpty()
    @IsIn(['created', 'in_transit', 'completed'],{
        message: 'Status must be one of the following values: created, in_transit or completed',
    })
    readonly status: string;

    @IsOptional()
    @IsMongoId({ message: 'pickup must be a valid ObjectId.' })
    readonly pickup: Types.ObjectId;

    @IsOptional()
    @IsMongoId({ message: 'dropoff must be a valid ObjectId.' })
    readonly dropoff: Types.ObjectId;
}

export class CreateOrderDto extends PickType(OrderDto, ['user', 'truck', 'status', 'pickup', 'dropoff'] as const) {}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
export class StatusOrderDto extends PickType(OrderDto, ['status'] as const) {}