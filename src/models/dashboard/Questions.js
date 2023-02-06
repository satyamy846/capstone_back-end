import mongoose, { Mongoose } from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type: String, 
        required: true
    },
    
    option1:{
        type:String,
    },
    option2:{
        type:String,
    },
    option3:{
        type:String,
    },
    option4:{
        type:String,
    },
    answer: {
        type: String,
        required: true
    },
});

export const questionmodel = new mongoose.model("Question",schema);