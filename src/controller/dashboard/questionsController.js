import { questionmodel } from "../../models/dashboard/Questions.js";
import CustomError from "../../utils/errorHandler.js";

export const questionsController = {
    async addQuestions(req,res,next){
        try{
            const data = await questionmodel.create({
                content:req.body.content,
                option1:req.body.option1,
                option2:req.body.option2,
                option3:req.body.option3,
                option4:req.body.option4,
                answer:req.body.answer
            });
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
        const id = req.params.id;
        const {content,option1,option2,option3,option4,answer} = req.body;
        try{
            const data = await questionmodel.findOneAndUpdate({
                content:content,
                option1:option1,
                option2:option2,
                option3:option3,
                option4:option4,
                answer:answer
            });
            res.status(200).json({
                success:"true",
                data:data
            });
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    async getQuestionsByTitle(req,res,next){
        const title = req.query.title;
        try{
            const details = await questionmodel.find({title});
            console.log(details)
            res.status(200).json({
                success:"true",
                data:details
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