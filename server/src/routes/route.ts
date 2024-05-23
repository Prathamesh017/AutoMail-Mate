import express from 'express'
import verifyToken from '../middleware/verifyToken.ts';
import { getEmails,generateEmailResponse,sendEmailResposne } from '../controllers/email-controller.ts';


const emailRouter = express.Router()


emailRouter.get("/", verifyToken, getEmails).post("/response",generateEmailResponse).post("/reply",verifyToken,sendEmailResposne);


export default emailRouter;