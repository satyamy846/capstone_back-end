import { questionmodel } from '../../models/dashboard/Questions.js';
import {quizmodel} from '../../models/dashboard/quiz.js';
import CustomError from '../../utils/errorHandler.js';


export const quizController = {
    //creating the quiz
    async addQuiz(req,res,next){
        try{
            const data = await quizmodel.create({
                title:req.body.title,
                description:req.body.description
            });
            // const quizdetails = data.save();
            console.log(data);
            res.send(data)
        }
        catch(err){
            next(new CustomError(err.message,500,"Internal server error"));
        }
    },
    //updating the quiz is only allowed by the faculty(teacher)
    async updateQuiz(req,res,next){
        try{
            const uni = req.params._id;
            const pack = req.body._id;
            console.log(pack);
            console.log(uni);
            const data = await quizmodel.findOneAndUpdate({uni},{$set:{title:req.body.title, description:req.body.description}},{new:true});
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
        try{
            await quizmodel.drop();
            
        }
        catch(err){
            next(new CustomError(err.message,400,"Unable to delete"));
        }
    },
    async getAllquestions(req,res,next){
        try{
            const title = req.query;
            
            const data = await questionmodel.find({title:"programming"})
            res.send(data);
            console.log(data);
        }
        catch(err){
            next(new CustomError(err.message,500,"unable to get"))
        }
    }
}