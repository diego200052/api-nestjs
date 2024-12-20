import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema({
    collection: 'locations',
    timestamps:true
})

export class Locations {

    readonly _id: Types.ObjectId

    @Prop({ 
        required: false,
    })
    address: string

    @Prop({ 
        required: true,
    })
    place_id: string;

    @Prop({ 
        required: false
    })
    latitude: number;

    @Prop({ 
        required: false
    })
    longitude: number;

}

export const LocationsSchema = SchemaFactory.createForClass(Locations)