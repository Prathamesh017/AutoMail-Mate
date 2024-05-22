import { Request, Response } from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"
import axios from "axios";



// @api - email/ GET
// @desc - get emails
export const getEmails = async (req: Request, res: Response) => {
  try {
    const access_token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const limit = req.headers.limit ? +req.headers?.limit : 0;
    const response = await axios.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const messages = response.data.messages;

    const result = [];
    for (let i = limit; i < limit + 5; i++) {
      const emailDetails = await axios.get(
        `https://www.googleapis.com/gmail/v1/users/me/messages/${messages[i].id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const senderDetails = emailDetails.data.payload.headers.filter((header: any) => {
        return header.name === 'From'
      })
      result.push({ email: emailDetails.data.snippet, sender: senderDetails[0]?.value })
    }
    res.status(200).json({
      status: "sucess", data: result
      , message: "email details"
    });
  } catch (e: any) {
    res.status(400).json({ status: "failure", message: e });

  }
}

// @api - /email/response POST
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