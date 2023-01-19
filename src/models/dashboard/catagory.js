import mongoose, { Schema } from 'mongoose';

const Schema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    }
});

export const catagorymodel = new mongoose.model('catagory',Schema);