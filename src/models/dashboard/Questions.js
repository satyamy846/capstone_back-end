import mongoose from "mongoose";

const schema = new mongoose.Schema({
    content:{
        type: String, 
        required: true
    },
    
    options:{
        type  :Array,
        default:[]
    },
    answer: {
        type: String,
        required: true
    },
    title:{
        type:String
    }

});

export const questionmodel = new mongoose.model("Question",schema);