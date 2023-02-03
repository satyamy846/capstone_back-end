import express from "express";
import { questionsController } from "../controller/dashboard/questionsController.js";  
//router mae file extension name k saath hi import hoti h ni toh error aata hai
const router = express.Router();

router.post('/create-questions',questionsController.addQuestions);
router.get('/get-questions',questionsController.getAllQuestions);

export default router;