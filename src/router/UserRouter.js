import express from 'express';
// import { newmodel } from '../model/Student.js';
// import CustomError from '../utils/errorHandler.js';
import { userController } from '../controller/userController.js';
// import jwt from 'jsonwebtoken';

const router = express.Router();


// userController is a object which is used to do operations on local db like fetching the data, posting, updating or deleting
router.post('/student',userController.userPost)

// router.post('/student', async(req,res)=>{
//     try{
//         //get user input
//         const {firstname,lastname,email,password,phone} = req.body;

//         //validate our user
//         if(!(email && password && firstname && lastname && phone)){
//             res.status(400).send("All fields are required");
//         }

//         //checking if the user is already exists
//         const oldUser = await userController.userPost.email;
//         if(oldUser){
//             res.status(409).send("User Already Exist Please Login")
//         }

//         //encrypt the password
//         const encryptedpassword = await bcrypt.hash(req.body.password,10);
        
//         //creating user database
//         const student = await student.create({
//             firstname,
//             lastname,
//             email:email.toLowerCase(),
//             password:encryptedpassword,
//         })

//         //creating jwt token
//         const token = jwt.sign(
//             { student },
//             process.env.TOKEN_KEY,
//             {
//               expiresIn: "24h",
//             }
//         );
        
//         //save your token
//         student.token = token;

//         res.status(200).json(user);
        
//     }

//     catch(err){
//         console.log(err.message);
//     }
    
// });

router.get('/student',userController.userfetch);
// router.put('/student',()=>{
    
// })

// router.delete('/student',()=>{
    
// })

export default router;