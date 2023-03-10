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
        // const id = req.params.id;
        const language = req.query.title;
        const{newtitle,newdescription} = req.body; //these data we got when user enters the info
        const newResult = {
            title:newtitle, //coming from the request body
            description:newdescription
        }
        try{
            const data = await quizmodel.findOneAndUpdate({language},newResult,{new:true});
            console.log(data); //new:true will update in db and returns the updated object
            res.status(200).json({
                success:"true",
                updatedRecord:data
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
        const title = req.query.title;
        try{
            // if(id.match(/^[0-9a-fA-F]{24}$/)){
            //     const record = await quizmodel.findByIdAndRemove(id);
            //     res.status(202).json({ //status 202 means your request has been accepted
            //         deletedrecord:record
            //     })
            // }
            const record = await quizmodel.deleteOne({title});
            res.status(202).json({
                deletedrecord:record
            });   
            
            
        }
        catch(err){
            next(new CustomError(err.message,400,"Unable to delete"));
        }
    },
}