import express from 'express';
import passport from 'passport';
import { quizController } from '../controller/dashboard/quizController.js';
import {auth} from '../middleware/auth.js'
const router = express.Router();

router.post('/addquiz',auth.authenticate,quizController.addQuiz);
router.get('/get-quiz',auth.authenticate,quizController.getQuiz);

router.get('/get-quizById/:id',auth.authenticate,quizController.getQuizById);

router.put('/update-quiz/:id',auth.authenticate,quizController.updateQuiz);
router.delete('/delete-quiz/:id',auth.authenticate,quizController.deleteQuiz);

export default router;