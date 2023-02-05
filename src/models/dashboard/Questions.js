import mongoose, { Mongoose } from "mongoose";

const schema = new mongoose.Schema({
    // Quizid:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'quiz'  //refencing to quiz
    // },
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
    // userId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'user' //referencing to user schema
    // }

});

export const questionmodel = new mongoose.model("Question",schema);