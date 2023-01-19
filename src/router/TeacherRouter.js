import express from 'express';
import {teachermodel} from '../models/Teacher.js';
import {teacherController} from '../controller/teacherController.js';
const router = express.Router();

router.post('/teacher',teacherController.teacherpost);


router.get('/teacher',teacherController.teacherfetch);

export default router;



