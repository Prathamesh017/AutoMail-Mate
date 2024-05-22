import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useGoogleLogin } from '@react-oauth/google';

function GoogleLogin() {
  const navigate=useNavigate()
  const login = useGoogleLogin({
    onSuccess: async(tokenResponse) => {
       const {access_token}=tokenResponse;
       localStorage.setItem("token",JSON.stringify(access_token));
       navigate("/dashboard")
       
    } ,
    scope:process.env.REACT_APP_GOOGLE_SCOPE
  });
  return (
    <button className='bg-[#4285F4] px-2 py-3 hover:text-slate-900 text-center rounded text-slate-200' onClick={() => login()}>Sign in with Google 🚀</button>
  )
}

export default GoogleLogin;