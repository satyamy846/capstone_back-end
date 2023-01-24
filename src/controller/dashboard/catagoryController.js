import { catagorymodel } from "../../models/dashboard/catagory.js";
import CustomError from '../../utils/errorHandler.js';

export const catagoryController = {
    async catagorypost(req,res,next){
        try{
            const data = await catagorymodel.create(req.body);
            res.status(200).json({
                success:"true",
                data:data,
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to create"))
        }
    },

    async catagoryfectch(req,res,next){
        try{
            const data = await catagorymodel.find({})
            res.status(200).json({
                success:"true",
                data:data
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to fetch"));
        }
    }
}
