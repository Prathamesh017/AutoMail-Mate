import express from 'express'
import verifyToken from '../middleware/verifyToken.ts';
import { getEmails } from '../controllers/email-controller.ts';


const emailRouter = express.Router()


emailRouter.get("/", verifyToken, getEmails);


export default emailRouter;