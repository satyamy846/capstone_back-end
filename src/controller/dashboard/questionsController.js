import { questionmodel } from "../../models/dashboard/Questions.js";
import CustomError from "../../utils/errorHandler.js";

export const questionsController = {
    async addQuestions(req,res,next){
        try{
            const data = await questionmodel.create(req.body);
            res.status(200).json({
                success:"true",
                data:data
            });
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    async updateQuestions(req,res,next){
        try{
            const data = await questionmodel.updateOne(req.body);
            res.status(200).json({
                success:"true",
                data:data
            });
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    async getQuestions(req,res,next){
        try{
            const data = await questionmodel.find({});
            res.status(200).json({
                success:"true",
                data:data
            });
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    async deleteQuestions(req,res,next){
        try{
             await questionmodel.drop();
        }
        catch(err){
            next(new CustomError(err.message,400,"Unable to delete"));
        }
    }
}