import React, { useState } from 'react'
import axios from "axios"

const EmailPop = ({ isOpen, setIsOpen,content,sender }) => {
  let url=process.env.REACT_APP_SERVER_URL;
  let defaultText ="Generating Response ..."
  const [text, setText] = useState(defaultText)
  const [isSuccess,setIsSuccess]=useState(false);

  async function replyEmail(){
    try {
    const access_token=JSON.parse(localStorage.getItem("token"));
    const userEmail=JSON.parse(localStorage.getItem("user-email"));

      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
         
        },
      }
       await axios.post(`${url}/email/reply`,{
        From:userEmail,
        To:sender,
        content:text,
      },config);
    setIsSuccess(true);
      
    } catch (error) {
      setIsSuccess(false);
      console.log(error);
     
    }
  }
  async function generateResponse(){
    try {
      const response = await axios.post(`${url}/email/response`,{
        content
      });
  
      setText(response.data.data);
   } catch (error) {
    console.log(error);   
   }
  }

 
  React.useEffect(()=>{
    generateResponse();
  },[])



  return (
    <>
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-3/4 md:w-1/4 ">
        <div className="flex justify-between items-center">
          <h4 className="text-md font-semibold text-green-700">AI GENERATED RESPONSE</h4>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            onClick={() => {
              setText(defaultText)
              setIsOpen(false)
            }}
          >
            <svg
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4 w-full">
          <textarea
            className="w-full p-1 rounded border border-slate-300"
            rows={4}
            cols={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
         <div className='flex justify-end'>
        <button onClick={replyEmail} className='bg-sky-700 p-2 rounded hover:text-slate-200'>Reply Email</button>
         </div>
         {
          isSuccess && 
         <div>
         <p className='text-green-800 text-center mt-4 text-xl'>Email Sent Successfully</p>
         </div>
         }
      </div>
    </div>
    </>
  )
}

export default EmailPop
