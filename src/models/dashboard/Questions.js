import mongoose from "mongoose";

const schema = new mongoose.Schema({
    qid:{
        type:String,
        required:true,
    },
    Content:{
        type:String
    },
    Textanswer:{
        type:String,
    },
    Option1:{
        type:String
    },
    Option2:{
        type:String
    },
    Option3:{
        type:String
    },
    Option4:{
        type:String
    },

});

export const questionmodel = new mongoose.model("Question",schema);