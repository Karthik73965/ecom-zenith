import mongoose , {model , Schema} from "mongoose";

const UserSchema = new Schema({
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
    // vivek , vinhav we can add more feilds later on according the requirement 
} , 
{
    timestamps:true // its madatory i think so 
}
)
const user = mongoose.model('testuser1 ', UserSchema) ; // model named as test user so that we can change it once its ready for the deployment 

export default user 