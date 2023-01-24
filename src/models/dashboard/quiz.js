import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    active:{
        type:Boolean,
        default:true
    },
    title:{
        type:String,
        
    },
    description:{
        type:String
    },
    maxmarks:{
        type:String
    },
    no_of_questions:{
        type:String,
    }
});

export const quizmodel = new mongoose.model("quiz",schema);