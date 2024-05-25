import { Request, Response } from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"
import axios from "axios";
import { emailQueue } from "../worker.ts";
import { fetchEmailService } from "../service/gmail-service.ts";


let  enableEmailQueue=true;
let job=0;
export enum emailType{
  GMAIL,
  OUTLOOK
}

// @api - mail/gmail GET
// @desc - get gmail emails
export const getEmails = async (req: Request, res: Response) => {
  try {
    const access_token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) as string;
    const limit = req.headers.limit ? +req.headers?.limit : 0;

    const result=await fetchEmailService(access_token,limit);    
   
    res.status(200).json({
      status: "success", data: result
      , message: "email details"
    });
    if (enableEmailQueue) {
      emailQueue.add("emails-fetch-job", { access_token, latestSender: result[0].sender,job:job++,mailType:emailType.GMAIL},)
      enableEmailQueue=false;
    }

  } catch (e: any) {
    res.status(400).json({ status: "failure", message: e });

  }
}

// @api - /mail/response POST
// @desc - get emails response
export const generateEmailResponse = async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY as string;
    const apimodel = process.env.GEMINI_MODEL as string;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: apimodel });
    const prompt = `Generate a Response for email ${req.body.content}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.status(200).json({
      status: "success", data: text
      , message: "AI Generated Email Response"
    });
  } catch (error: any) {
    res.status(400).json({ status: "failure", message: error });

  }
}


// @api - /mail/gmail/reply POST
// @desc - reply emails response
export const sendEmailResposne = async (req: Request, res: Response) => {
  try {

    const access_token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    const From = req.body.From;
    const To = req.body.To;
    const content = req.body.content;

    const emailLines = [
      `From: ${From}`,
      `To: ${To}`,
      'Subject: AI Generated Response',
      'Content-Type: multipart/alternative; boundary="boundary"',
      '',
      '--boundary',
      'Content-Type: text/plain; charset="UTF-8"',
      '',
      `${content}`,
      '',
      '--boundary',
      'Content-Type: text/html; charset="UTF-8"',
      '',
      `<div>${content}</div>`,
      '',
      '--boundary--'
    ].join('\r\n');

    const encodedMessage = Buffer.from(emailLines)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
     await axios.post(
      `https://gmail.googleapis.com/gmail/v1/users/${From}/messages/send`,
      {
        raw: encodedMessage
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    res.status(200).json({
      status: "success",
      message: "Email Sent"
    });

  } catch (error: any) {
    res.status(400).json({ status: "failure", message: error });
  }
}