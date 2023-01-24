import mongoose from "mongoose";

const schema = new mongoose.Schema({
    qid:{
        type:String,
    },
    Content:{
        type:String
    },
    Textanswer:{
        type:String,
        required:true
    },
    Option1:{
        type:String,
        required:true
    },
    Option2:{
        type:String,
        required:true
    },
    Option3:{
        type:String,
        required:true
    },
    Option4:{
        type:String,
        required:true
    },

});

export const questionmodel = new mongoose.model("Question",schema);