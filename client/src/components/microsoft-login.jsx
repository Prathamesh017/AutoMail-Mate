import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import MicrosoftLogin from 'react-microsoft-login'
function MicrosoftOutLookLogin() {
  const navigate=useNavigate()
  const scopes = ['Mail.Read','Mail.Send']
  const authHandler =async (err, data) => {
    try {
      const {accessToken}=data;
      localStorage.setItem("token",JSON.stringify(accessToken)); 
      localStorage.setItem("mail",JSON.stringify("outlook"));
      const response= await axios.get('https://graph.microsoft.com/v1.0/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        localStorage.setItem("user-email",JSON.stringify(response.data.mail));
        navigate("/dashboard");
    } catch (error) {
      console.log(error);  
    }
  }
  return (
    <MicrosoftLogin
    clientId={process.env.REACT_APP_MICROSOFT_CLIENT_ID}
    authCallback={authHandler}
    graphScopes={scopes}
  />
  )
}

export default MicrosoftOutLookLogin;