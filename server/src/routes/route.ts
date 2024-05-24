import express from 'express'
import verifyToken from '../middleware/verifyToken.ts';
import { getEmails,generateEmailResponse,sendEmailResposne } from '../controllers/email-controller.ts';
import {getOutLookEmails,sendOutlookResponse} from "../controllers/outlook-controlller.ts";



const emailRouter = express.Router()

emailRouter.get("/gmail", verifyToken, getEmails).post("/response",generateEmailResponse).post("/gmail/reply",verifyToken,sendEmailResposne).get("/outlook",verifyToken,getOutLookEmails).post("/outlook/reply",verifyToken,sendOutlookResponse);


export default emailRouter;