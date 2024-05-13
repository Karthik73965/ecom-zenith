import mongoose , {model , Schema} from "mongoose";

const AdminSchema = new Schema({
    UserName :{
        type:String, 
        required:true,
    }, 
    Email:{
        type:String,
        required:true ,
    },
    PhoneNumber:{
        type:Number,
        required:true,
        
    }
} , 
{
    timestamps:true
}
)
const admin = mongoose.model('testadmin1 ', AdminSchema) ; 

export default admin 