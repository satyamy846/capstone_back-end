import CustomError from '../utils/errorHandler.js';
//importing model to show fetch our data from the local db
import { usermodel } from '../models/User.js';
import {quizmodel} from '../models/dashboard/quiz.js';
import { questionmodel } from '../models/dashboard/Questions.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SECRET_KEY = "NOTESAPI";

export const userController = {
    async signup(req,res,next){
        const {firstname,lastname,email,password,contact} = req.body;
        try{
            
            //checking existing user
            const existinguser = await usermodel.findOne({email:email});
            if(existinguser){
                return res.status(400).json({message:"User is already exists"})
            }
            //Now hashed the password (Encrypt it)
            const hashedpassword = await bcrypt.hash(password,10);  //hash takes two argument one what we want to hash and another is how many times our hashing code will run

            //create the user in database
            const result = await usermodel.create({
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:hashedpassword,
                contact:contact
            });
            
            //generate the token
            const token = await jwt.sign({email: result.email ,id: req._id},SECRET_KEY)  //sign(payload,secretkey) payload-> used to store that if it is a valid user or not| secretkey
            res.status(201).json({user:result,token:token})
        }
        catch(err){
            next(new CustomError(err.message,500,"unable to create userpost"))
        }
    },
    async login(req,res,next){
        //catch the details from user request
        const {email,password} = req.body;
        try{

            //check the existing user
            const existinguser = await usermodel.findOne({email:email});
            if(!existinguser){
                return res.status(404).json({message:"User Not found Please signup first"})
            }

            //if user exists then check the password we will use bcrypt compare method to compare the user password with stored db password

            const matchpassword = await bcrypt.compare(password,existinguser.password);
            //if password doesn't match
            if(!matchpassword){
                return res.status(400).json({message:"Invalid Credentials"});
            }

            //password matches then generate the token
            const token = await jwt.sign({email: existinguser.email ,id: existinguser._id},SECRET_KEY);
            res.status(200).json({
                user:existinguser,token:token
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"unable to create userpost"))
        }
    },
    async logout(req, res) {
        try{
            res.clearCookie("token");
            res.removeHeader("auth-token");
            res.send("logged out");
        }
        catch(err){
            console.log(err);
        }
      },
    // async dashboard(req,res,next){
    //     try{
    //         return res.redirect('/dashboard')
    //     }
    //     catch(err){
    //         next(new CustomError(err.message,500,"unable to fetch"))
    //     }
    // },

    //creating a session( it is just creating a session in passport.js )
    // async createSession(req,res,next){
    //     try{
    //         res.render('/');
    //     }
    //     catch(err){
    //         next(new CustomError(err.message,500,"Unable to create session"))
    //     }
    // },

    // //destroy sesssion
    // async destroysession(req,res,next){
    //     try{
    //         req.logout();
    //         return res.redirect('/');
    //     }
    //     catch(err){
    //         next(new CustomError(err.message,400,"error occurs"))
    //     }
    // },


    async getAllquiz(req,res,next){
        try{
            
            const data = await quizmodel.find({ quizname}, (err, qz) => {
                if (err) {
                    console.log(error);
                    res.json({ msg: "failed to fetch quiz details" });
                }
                else {
                    res.status(200).json({ quiz:qz });
                }
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to fetch all the quiz"))
        }
    },
    // async createquiz(req,res,next){
    //     try{
    //         const data = await quizmodel.create({
    //             title: req.body.title,
    //             description: req.body.description,
    //             user: user._id
                
    //         })
    //         console.log(data);
    //         res.status(200).json({
    //             success:true,
    //             data:data
    //         })
    //     }
    //     catch(err){
    //         next(new CustomError(err.message,500,"Failed to create quiz"));
    //     }
    // },
    async getAllquestions(req,res,next){
        try{
            const quizdetails = await questionmodel.find({ quizid:req.params.quizid})
            res.status(200).json({
                success:true,
                quizdetails:quizdetails
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to fetch all questions"))
        }
    }
    
}
