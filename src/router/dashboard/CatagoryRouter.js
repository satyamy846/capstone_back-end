import express from 'express';
// import { catagorymodel } from "../../models/dashboard/catagory";
// import CustomError from "../../utils/errorHandler";
import {catagoryController} from "../../controller/dashboard/catagoryController.js";


const router = express.Router();

router.post('/catagory',catagoryController.catagorypost);

router.get('/catagory',catagoryController.catagoryfectch);

export default router;