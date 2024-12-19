import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema({
    collection: 'users',
    timestamps:true    
})

export class Users {

    readonly _id: Types.ObjectId

    @Prop({ 
        required: true,
        unique: true,
    })
    email: string;

    @Prop({ 
        required: true
    })
    password: string;

}

export const UsersSchema = SchemaFactory.createForClass(Users)