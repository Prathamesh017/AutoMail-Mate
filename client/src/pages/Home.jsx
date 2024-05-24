import React from 'react'
import GoogleLogin from '../components/google-login'
import MicrosoftOutLookLogin from "../components/microsoft-login"
function Home() {
  return (
    <div className="w-screen h-screen bg-[#273444] flex flex-col">
      <h1 className="text-3xl text-slate-200 h-1/10 font-sans p-2">
        AutoMail Mate
      </h1>
      <div className="login-container grow  flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <GoogleLogin></GoogleLogin>
        <MicrosoftOutLookLogin></MicrosoftOutLookLogin>
      </div>
      </div>
    </div>
  )
}

export default Home