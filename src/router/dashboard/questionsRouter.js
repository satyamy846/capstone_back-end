import express, { Router } from 'express';

import { questionsController } from '../../controller/dashboard/questionsController.js';

const router = express.Router();


//add quiz
router.post('/questions',questionsController.addQuestions);

// get quiz
router.get('/questions',questionsController.getQuestions);

//update quiz
// router.put('/quiz',quizController.changes);

//delete quiz
router.delete(questionsController.deleteQuestions);

export default router;
