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
            console.log(err.message);
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    async updateQuestions(req,res,next){
        // const title = req.params.title;
        const questionId = req.params.id;
        const {content,option1,option2,option3,option4,answer} = req.body;
        try{
            const newdetails = {
                content:content,
                option1:option1,
                option2:option2,
                option3:option3,
                option4:option4,
                answer:answer
            }
            const data = await questionmodel.findByIdAndUpdate({_id:questionId},newdetails,{
                new:true
            });
            console.log(data);
            res.status(200).json({
                success:"true",
                data:data
            });
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    async getQuestionsBytitle(req,res,next){
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
    async deleteQuestionById(req,res,next){
        const questionid = req.params.id;
        try{
            const record = await questionmodel.findByIdAndDelete({_id:questionid});
            res.status(202).json({ //status 202 means your request has been accepted
                deletedrecord:record
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to delete"));
        }
    },
    async deleteAllQuestions(req,res,next){
        const title = req.query.title;
        try{
            const record = await questionmodel.deleteMany({title});
            res.status(202).json({ //status 202 means your request has been accepted
                deletedrecord:record
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to delete"));
        }
    }
}