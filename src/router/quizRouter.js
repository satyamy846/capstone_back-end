import express from 'express';
import passport from 'passport';
import { quizController } from '../controller/dashboard/quizController.js';
const router = express.Router();

router.post('/create-quiz',quizController.addQuiz);
router.get('/get-quiz',quizController.getQuiz);
// router.get('/get-quiz',quizController.getquizbyStudent);
router.put('/quiz/:id',quizController.updateQuiz);
router.get('/getAllquestions',quizController.getAllquestions);

export default router;