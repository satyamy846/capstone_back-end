import CustomError from '../utils/errorHandler.js';
//importing model to show fetch our data from the local db
import { newmodel } from '../models/Student.js';
export const userController = {
    async userPost(req, res, next) {
    
        try {
            const data = await newmodel.create(req.body); //here newmodel is our model in mongoose db
    
            // console.log(req.body);
             //showing response to browser
            res.status(200).json({
                success: "true",
                data: data,
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"unable to create")) //here next is the middleware use to handle the error
        }
    },

    async userfetch(req,res,next){
        try{
            const data = await newmodel.find({})
            res.send(data);
        }
        catch(err){
            next(new CustomError(err.message,500,"unable to fetch"))
        }
    },

    //creating a session( it is just creating a session in passport.js )
    async createSession(req,res,next){
        try{
            res.render('/');
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to create session"))
        }
    },
    
}
