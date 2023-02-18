import express from "express";
import { questionsController } from "../controller/dashboard/questionsController.js";  
//router mae file extension name k saath hi import hoti h ni toh error aata hai

import {auth} from '../middleware/auth.js';
const router = express.Router();

router.post('/addquestions',auth.authenticate,questionsController.addQuestions);
router.get('/get-questions',auth.authenticate,questionsController.getQuestionsBytitle);
router.put('/update-questions',auth.authenticate,questionsController.updateQuestions);
router.delete('/delete-questions',auth.authenticate,questionsController.deleteQuestions);

export default router;