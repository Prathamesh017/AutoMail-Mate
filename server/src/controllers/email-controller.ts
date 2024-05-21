import { Request, Response } from "express"
import axios from "axios";

// @api - v1/email/ GET
// @desc - get emails
export const getEmails = async (req: Request, res: Response) => {
  try {
    const access_token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const response = await axios.get('https://www.googleapis.com/gmail/v1/users/me/messages', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const messages = response.data.messages;


    const emailDetails = await axios.get(
      `https://www.googleapis.com/gmail/v1/users/me/messages/${messages[0].id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

   const senderDetails=emailDetails.data.payload.headers.filter((header:any)=>{
    return header.name==='From'
   })
  
    res.status(200).json({ status: "sucess",data:{
      email:emailDetails.data.snippet,sender:senderDetails[0]?.value}
    ,message: "email details" });
  } catch (e: any) {
    res.status(400).json({ status: "failure", message: e });

  }
}