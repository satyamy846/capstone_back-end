import mongoose from "mongoose";
//creating the schema
const schema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:Number
    },
    token:{
        type:String,
    }

});
//exporting the model
export const newmodel = new mongoose.model('student',schema);

