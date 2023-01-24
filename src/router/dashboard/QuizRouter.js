import express, { Router } from 'express';

import {quizController} from '../../controller/dashboard/quizController.js'

const router = express.Router();


//add quiz
router.post('/quiz',quizController.addQuiz);

// get quiz
router.get('/quiz',quizController.getQuiz);

//update quiz
// router.put('/quiz',quizController.changes);

//delete quiz
router.delete(quizController.deleteQuiz);

export default router;


