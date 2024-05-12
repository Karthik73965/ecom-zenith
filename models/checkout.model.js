import { Model, Schema } from "mongoose";
import mongoose from "mongoose";

const CheckOutSchema = new Schema({
    FirstName: {
        type: String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    PinCode:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Chekcout = mongoose.model('TestCheckOut1', CheckOutSchema)

export default Chekcout