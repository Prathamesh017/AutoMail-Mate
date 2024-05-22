import express from 'express'
import verifyToken from '../middleware/verifyToken.ts';
import { getEmails,generateEmailResponse } from '../controllers/email-controller.ts';


const emailRouter = express.Router()


emailRouter.get("/", verifyToken, getEmails).post("/response",generateEmailResponse);


export default emailRouter;