import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema({
    collection: 'orders',
    timestamps:true
})

export class Orders {

    readonly _id: Types.ObjectId

    @Prop({ 
        required: true,
    })
    user: Types.ObjectId;

    @Prop({ 
        required: false,
    })
    truck: Types.ObjectId;

    @Prop({
        required: true,
        enum: ['created', 'in_transit', 'completed'],
        default: 'created',
      })
    status: string;

    @Prop({ 
        required: false
    })
    pickup: Types.ObjectId;

    @Prop({ 
        required: false
    })
    dropoff: Types.ObjectId;

}

export const OrdersSchema = SchemaFactory.createForClass(Orders)