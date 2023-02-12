
import * as dotenv from 'dotenv';
import express from 'express';
import {connection} from './config/connectdb.js'; // we are doing connection braces coz we exported the content as a constant

import bodyParser from 'body-parser';
import cors from 'cors'; //to handle the cross origin policy like your server is running on 5000 and your front is running on 5173 so it resolves it
// import {auth} from './middleware/auth.js';
//importing routers to give path to all the routes
import Userrouter from './router/UserRouter.js';
import teacherRouter from './router/TeacherRouter.js';
import quizRouter from './router/quizRouter.js';
import questionRouter from './router/questionRouter.js';

// const dotenv1 = dotenv;
const app = express();
dotenv.config();
// const { API_PORT } = process.env;
const port = process.env.PORT || 3000;
app.use(cors({origin:"*"}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // next is used to handler the error
});

app.use(express.json());


//allowing path to the all routers
app.use(Userrouter);
app.use(teacherRouter);
app.use(quizRouter);
app.use(questionRouter);

//connecting with database
connection();

// app.use(auth);



app.get('/',(req,res,next)=>{
    console.log("HTTP Method ->" + req.method + "URL" + req.url);
    res.send("Server is running ");
})



//creating a server
app.listen(port,function(){
    console.log(`server running http://localhost:${port}`);
});