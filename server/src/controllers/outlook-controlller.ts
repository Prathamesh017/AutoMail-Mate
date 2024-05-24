import { Request, Response } from "express"
import { fetchOutLookEmailService } from "../service/outlook-service.ts";
import { emailQueue } from "../worker.ts";
import axios from "axios";


// @api - /mail/outlook GET
// @desc - get outlook emails 
export const getOutLookEmails = async (req: Request, res: Response) => {
  try {
    const access_token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) as string;
    const limit = req.headers.limit ? +req.headers?.limit : 0;
    const result = await fetchOutLookEmailService(access_token, limit);
    // emailQueue.add("email-fetch-job", { access_token,latestSender:result[0].sender},) 
    console.log(result);
    res.status(200).json({
      status: "sucess", data: result
      , message: "email details"
    });

  } catch (e: any) {
    res.status(400).json({ status: "failure", message: e });

  }
}

// @api - /email/outlook/reply POST
// @desc - reply emails response
export const sendOutlookResponse=async(req:Request,res:Response)=>{
  try{
const access_token = req.headers.authorization && req.headers.authorization.split(' ')[1];

const To = req.body.To;
const content = req.body.content;
const emailBody ={
  "message": {
    "subject": "AI Generated Reply",
    "body": {
      "contentType": "Text",
      "content":`${content}`
    },
    "toRecipients": [
      {
        "emailAddress": {
          "address": `${To}`
        }
      }
    ]
  }
}

await axios.post(
  `https://graph.microsoft.com/v1.0/me/sendMail`,
  emailBody,
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
  }
  catch(error:any){
    res.status(400).json({ status: "failure", message: error });
  }
}