import axios from 'axios';
export const fetchOutLookEmailService=async(access_token:string,limit:number)=>{
  const response =await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const messages = response.data.value;
    const result = [];
    for (let i = limit; i < limit + 5; i++) {
      if(messages.length>i){
        result.push({ email: messages[i].bodyPreview, sender: messages[i].from.emailAddress.name+'<'+messages[i].from.emailAddress.address+'>'})  
      }else{
        break;
      }
    }
    return result;
}