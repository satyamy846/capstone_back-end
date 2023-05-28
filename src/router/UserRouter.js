import express from 'express';
import { userController } from '../controller/userController.js';
import {auth} from '../middleware/auth.js'
const router = express.Router();


// userController is a object which is used to do operations on local db like fetching the data, posting, updating or deleting
router.post('/student',userController.signup);

router.post('/student/login',userController.login);
// router.get('/',userController.logout);
// router.get('/get-user',userController.getuserbyemail);
router.get('/get-user',userController.getuserdetails);


// router.get('/quiz',userController.getAllquiz);
// router.post('/quiz',userController.createquiz);
// router.get('/dashboard',passport.checkAuthentication,userController.dashboard);

// router.get('/get-users',userController.login);

//sign out the user which is login
// router.get('/sign-out',userController.destroysession);

export default router;