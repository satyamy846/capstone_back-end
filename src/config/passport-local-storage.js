import passport from 'passport';
import Student from '../models/Student';

// import LocalStrategy from 'passport-local'
const LocalStrategy = require('passport-local').Strategy;

//we need to tell passport to use this local strategy that we have created
// authentication using passport 
//this part is used for finding the user and authenticating them
passport.use(new LocalStrategy({
    usernameField: 'email' //how to detect if this is a user ( by its email)
    },
    function(email,password,done){ // done is callback function which is reporting to the passport.js
        //finding user and establish the identity
                // email(containing in db):email(the value passed from the user input)
        Student.findOne({email:email}, function(err,user){
            if(err) {console.log('Error in finding user ---> passport');}
            return done(err);
            //user ki email aagyi
            if(!user || user.password!=password){ //user
            console.log('Invalid Username or password');
            return done(null,false);  //null says if it is an error or false indicates that authentication has not been done
            }
        return done(null,user)
        })
    }
));

//once we authenticate then we serialize the user means which property is to be sent to the cookies and then cookies sent to the browser 
//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id) //user id is encrypted
});


//then we deserialize it means finding the user who has signed in and making a request
//deserializeing the user from the key in the cookies
passport.deserializeUser(function(id,user){
    Student.findById(id, function(err,user){
        if(err) console.log('error in finding user');
        return done(err);
    })
    return done(null,user);
});


//check if user is authenticated
passport.checkauthentication = function(req,res,next){
    //if the user is signed in, then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.serAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.Student contains the current signed in user from session cookie and we are just sending this to locals for the views
        res.locals.Student = req.Student;
    }
    next();
}




module.exports= passport;