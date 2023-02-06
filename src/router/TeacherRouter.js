import express from 'express';
import {teachermodel} from '../models/Teacher.js';
import {teacherController} from '../controller/teacherController.js';
import { auth } from '../middleware/auth.js';
const router = express.Router();

router.post('/teacher',teacherController.signup);


router.post('/teacher/login',teacherController.login);
router.get('/getTeacherdetails',auth.authenticate,teacherController.getTeacherdetails);

export default router;



