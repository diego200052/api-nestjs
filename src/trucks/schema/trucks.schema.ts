import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema({
    collection: 'trucks',
    timestamps:true
})

export class Trucks {

    readonly _id: Types.ObjectId

    @Prop({ 
        required: true,
    })
    user: Types.ObjectId

    @Prop({ 
        required: true,
    })
    year: string;

    @Prop({ 
        required: true
    })
    color: string;

    @Prop({ 
        required: true
    })
    plates: string;

}

export const TrucksSchema = SchemaFactory.createForClass(Trucks)