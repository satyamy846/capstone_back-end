import {quizmodel} from '../../models/dashboard/quiz.js';
import CustomError from '../../utils/errorHandler.js';


export const quizController = {
    async addQuiz(req,res,next){
        try{
            const data = await quizmodel.create(req.body);
            res.status(200).json({
                success:"true",
                data:data
            });
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    async updateQuiz(req,res,next){
        try{
            const data = await quizmodel.updateOne(req.body);
            res.status(200).json({
                success:"true",
                data:data
            });
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    async getQuiz(req,res,next){
        try{
            const data = await quizmodel.find({});
            res.status(200).json({
                success:"true",
                data:data
            });
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    async deleteQuiz(req,res,next){
        try{
            await quizmodel.drop();
            
        }
        catch(err){
            next(new CustomError(err.message,400,"Unable to delete"));
        }
    }
}