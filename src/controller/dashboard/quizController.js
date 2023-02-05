import { questionmodel } from '../../models/dashboard/Questions.js';
import {quizmodel} from '../../models/dashboard/quiz.js';
import CustomError from '../../utils/errorHandler.js';


export const quizController = {
    //creating the quiz
    async addQuiz(req,res,next){
        try{
            const data = await quizmodel.create(req.body);
            
            console.log(data);
            return res.status(200).json({data})
            
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    //updating the quiz is only allowed by the faculty(teacher)
    async updateQuiz(req,res,next){
        const id = req.params.id;
        const {title,description} = req.body; //these data we got when user enters the info
        const newResult = {
            title:title, //coming from the request body
            description:description
        }
        try{
            await quizmodel.findOneAndUpdate(id,newResult,{new:true}); //new:true will update in db and returns the updated object
            res.status(200).json({
                success:"true",
                updatedRecord:newResult
            });
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    async getQuiz(req,res,next){
        try{
            // const data = await quizmodel.find({_id:req.body.studentId}).populate('user');
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
        const id = req.params.id;
        try{
            const record = await quizmodel.findByIdAndRemove(id);
            res.status(202).json({ //status 202 means your request has been accepted
                deletedrecord:record
            })
        }
        catch(err){
            next(new CustomError(err.message,400,"Unable to delete"));
        }
    },
}