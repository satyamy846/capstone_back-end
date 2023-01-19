import express from 'express';
import {connection} from './config/connectdb.js'; // we are doing connection braces coz we exported the content as a constant
import Userrouter from './router/UserRouter.js';
import teacherRouter from './router/TeacherRouter.js';
import bodyParser from 'body-parser';
const app = express();

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); // next is used to handler the error
});

app.use(express.json());
app.use(Userrouter);
app.use(teacherRouter);
connection();

//creating a server
app.listen(5000,function(){
    console.log(`connected successfully http://localhost:5000/`);
});