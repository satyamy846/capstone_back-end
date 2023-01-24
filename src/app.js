import express from 'express';
import {connection} from './config/connectdb.js'; // we are doing connection braces coz we exported the content as a constant
import Userrouter from './router/UserRouter.js';
import teacherRouter from './router/TeacherRouter.js';
import bodyParser from 'body-parser';

//importing routers to give path to all the routes
import CatagoryRouter from './router/dashboard/CatagoryRouter.js'
import QuizRouter from './router/dashboard/QuizRouter.js';
import questionsRouter from './router/dashboard/questionsRouter.js';


//used for session cookie
// import session from 'express-session';
// import passport from 'passport';
// import passportLocal from './config/passport-local-storage';
// import MongoStore from 'connect-mongo';
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


//allowing path to the all routers
app.use(Userrouter);
app.use(teacherRouter);
app.use(CatagoryRouter);
app.use(QuizRouter);
app.use(questionsRouter);

//connecting with database
connection();

//mongo store is used to store the session cookie in db
// app.use(session({
//     name:'examPortal',
//     //todo this could be change at the time of deplopyment
//     secret:'Iknowsomething',
//     saveUninitialized:false,  //when user has not been logged in then do we need to store extra information in session cookie obviously no
//     resave:false,             // when user info is saved in session cookie do we need to change info again and again?  No that's why we set as false
//     cookie:{
//         maxAge:(1000*60*100)
//     },
//     store: new MongoStore({
//         mongooseConnection: connection,
//         autoRemove: 'disabled'
      
//         },
//         function(err){
//             console.log(err || 'connect-mongo setup ok');
//         }
//     )
// }));

// app.use(passport.initialize());
// app.use(passport.session);    //passport also helps in maintaining the session

//user will be authenticated every time
// app.use(passport.setAuthenticatedUser);

// app.use('/',require('./router'));

//creating a server
app.listen(5000,function(){
    console.log(`connected successfully http://localhost:5000/`);
});