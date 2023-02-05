import mongoose from 'mongoose';
// import { usermodel } from '../User';
const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:[true,"Title is required"],
        
    },
    description:{
        type:String
    },
    
    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'user',  // referencing to user model,
    // },

},{
    timestamps:true
}); 



export const quizmodel = new mongoose.model("quiz",schema);