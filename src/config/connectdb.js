import mongoose from 'mongoose';

export const connection = async () => {
    try {
        mongoose.set('strictQuery', false); //why this?
        await mongoose.connect(`mongodb://127.0.0.1:27017/examportal`) //connecting with mongoose
        console.log('Database connected sucessfully')
    }
    catch (error) {
        console.log(error)
    }
}
