import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    active:{
        type:Boolean
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    maxmarks:{
        type:String
    },
    no_of_questions:{
        type:String
    }
});

export default quizmodel = new mongoose.model("quiz",schema);