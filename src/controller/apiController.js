import { usermodel } from "../models/User";

export const apiController = {
    async studentRegister(req,res,next){
            try {

                usermodel.find({email:req.body.email},(err,count)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(count){
                            console.log("Email already exist");
                        }
                        else{
                            const details = new usermodel({
                                firstname:req.body.firstname,
                                lastname:req.body.lastname,
                                email:req.body.email,
                                password:req.body.password,
                                role: "student"
                            })
                            usermodel.create(details);
                            res.status(200).json({
                                succuess:true,
                                details:details
                            })
                            console.log(details);
                        }
                    }
                })
                
            }
            catch(err){
                next(new CustomError(err.message,500,"unable to create")) //here next is the middleware use to handle the error
            }
    }
}