import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    }
});

export const catagorymodel = new mongoose.model('catagory',schema);