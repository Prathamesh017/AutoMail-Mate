import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleLogin() {
  const navigate=useNavigate()
  const login = useGoogleLogin({
    onSuccess: async(tokenResponse) => {
  
       const {access_token}=tokenResponse;
       localStorage.setItem("token",JSON.stringify(access_token));
       localStorage.setItem("mail",JSON.stringify("gmail"));
       const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        localStorage.setItem("user-email",JSON.stringify(response.data.email))
        navigate("/dashboard")
       
    } ,
    scope:process.env.REACT_APP_GOOGLE_SCOPE
  });
  return (
    <button className='bg-[#4285F4] px-1 py-2 hover:text-slate-900 text-center rounded text-slate-200' onClick={() => login()}>🚀Sign in with Google</button>
  )
}

export default GoogleLogin;