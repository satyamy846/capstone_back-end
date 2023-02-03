import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    otp:{
        type:String,
    },
    email:{
        type:String,
    },
    createdAt: {type:Date, default:Date.now}
});

export const otpmodule = new mongoose.model('otp',schema);