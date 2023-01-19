import CustomError from "../utils/errorHandler.js";
import {teachermodel} from '../models/Teacher.js';

export const teacherController={
    async teacherpost (req,res,next){
        try{
            const data = await teachermodel.create(req.body);
            res.status(200).json({
                success:true,
                data:data
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to Create"));
        }
    },
    async teacherfetch(req,res,next){
        try{
            const data = await teachermodel.find({});
            res.send(data);
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to fetch"))
        }
    }
    
}