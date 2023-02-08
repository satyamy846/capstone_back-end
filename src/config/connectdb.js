import mongoose from 'mongoose';

export const connection = async () => {
    try {
        //This means that, by default, Mongoose will filter out query filter properties that are not in the schema.
        // You can also disable strictQuery globally to override:
        mongoose.set('strictQuery', false); 
        await mongoose.connect(process.env.MONGO_URI) //connecting with mongoose
        console.log('Database connected sucessfully')
    }
    catch (error) {
        console.log(error)
    }
}
