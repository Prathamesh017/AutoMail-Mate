import express from 'express';
import { getEmails } from '../controllers/email-controller.js';
import verifyToken from '../middleware/verifyToken.js';
const emailRouter = express.Router();
emailRouter.get("/", verifyToken, getEmails);
export default emailRouter;
