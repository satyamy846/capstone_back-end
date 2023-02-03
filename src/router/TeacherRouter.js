import express from 'express';
import {teachermodel} from '../models/Teacher.js';
import {teacherController} from '../controller/teacherController.js';
const router = express.Router();

router.post('/teacher',teacherController.signup);


router.post('/teacher/login',teacherController.login);

export default router;



