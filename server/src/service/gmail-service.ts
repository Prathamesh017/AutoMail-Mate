import axios from 'axios';
export const fetchEmailService=async(access_token:string,limit:number)=>{
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
    return result;
}