import CustomError from "../utils/errorHandler.js";
import { teachermodel } from '../models/Teacher.js';
import { quizmodel } from "../models/dashboard/quiz.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SECRET_KEY = "NOTESAPI";


export const teacherController = {

    async signup(req, res, next) {
        //extracting the details of teacher
        const { firstname, lastname, email, password, contact } = req.body;
        try {
            //checking existing user
            const existinguser = await teachermodel.findOne({ email: email });
            if (existinguser) {
                return res.status(400).json({ message: "User is already exists" })
            }
            //Now hashed the password (Encrypt it)
            const hashedpassword = await bcrypt.hash(password, 10);  //hash takes two argument one what we want to hash and another is how many times our hashing code will run

            //create the user in database
            const result = await teachermodel.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedpassword,
                contact: contact
            });

            //generate the token
            const token = await jwt.sign({ email: result.email, id: req._id }, SECRET_KEY)  //sign(payload,secretkey) payload-> used to store that if it is a valid user or not| secretkey
            res.status(201).json({ user: result, token: token })

        }
        catch (err) {
            next(new CustomError(err.message, 500, "Unable to Create"));
        }
    },
    async login(req, res, next) {
        //extracting teacher email or password while signing in
        const { email, password } = req.body;
        console.log(email + password);
        try {

            const existinguser = await teachermodel.find({ email: email })

           
            console.log(existinguser);
            if (!existinguser) {
                return res.status(404).json({ message: "User Not Found" });
            }
            else {
                //check the password
                console.log("existing password " + existinguser[0].password);
                const matchingpassword = await bcrypt.compare(password, existinguser[0].password);
                console.log("match password " + matchingpassword);
                if (!matchingpassword) {
                    return res.status(400).json({ message: "Invalid Credential" })
                }
                //password matched then generate the token
                const token = await jwt.sign({ email: existinguser.email, id: existinguser[0]._id }, SECRET_KEY);
                res.status(200).json({
                    teacher: existinguser,
                    token
                })
            }


        }
        catch (err) {
            console.log(err);
            next(new CustomError(err, 500, "Unable to Login In"))
        }
    },
    async getTeacherdetails(req,res,next){
        try{
            const details = await teachermodel.find({});
            res.status(200).json({
                data:details
            })
        }
        catch(err){
            next(new CustomError(err.message,500,"Unable to get teacher details"))
        }
    }

}