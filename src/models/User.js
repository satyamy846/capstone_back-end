import mongoose from "mongoose";
import isEmail from '../node_modules/validator/lib/isEmail.js'
// import {quizmodel} from './dashboard/quiz'
//creating the schema
const schema=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"First name is required!"]
    },
    lastname:{
        type:String,
        required:[true,"Last name is required!"]
    },
    email:{
        type:String,
        required:[true,"email is required!"],
        unique:true,
        lowercase:true,
        validate:[isEmail,"Please Enter valid email"]
    },
    password:{
        type:String,
        required:true,
        minlength:[5,'Please enter atleast 5 characters']
    },
    contact:{
        type:String
    },
    // token:{
    //     type:String
    // }
    // quiz:[{
    //     type:mongoose.Types.ObjectId,
    //     ref:'quiz' // referencing quiz collection with user collection
    // }]
},
{
    timestamps:true
});
//exporting the model
export const usermodel = new mongoose.model('user',schema);

