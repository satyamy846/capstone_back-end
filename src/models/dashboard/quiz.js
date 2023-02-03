import mongoose from 'mongoose';
// import { usermodel } from '../User';
const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:true
        
    },
    description:{
        type:String
    },
    // user:[{
    //     type: mongoose.Types.ObjectId,
    //     ref:'user'  // referencing to user model
    // }],
    // email:{
    //     type:String
    // }
},{
    timestamps:true
}); 



export const quizmodel = new mongoose.model("quiz",schema);