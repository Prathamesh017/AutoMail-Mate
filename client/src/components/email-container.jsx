import React, { useState } from 'react'
import { FaReply } from 'react-icons/fa'
import EmailPop from './email-popup'
import { IoIosArrowForward } from 'react-icons/io'
import { IoIosArrowBack } from 'react-icons/io'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function EmailContainer({ data,fetchEmails,limit,isError}) {
  const [isOpen, setIsOpen] = useState(false)
  const [emailContent,setEmailContent]=useState();
  return (
    <>
      {data.length>0 && (
        <>
          <div className="w-full h-full mt-4 flex flex-col gap-8">
            {data.map((emailObj, i) => (
              <div
                key={i}
                className="email-box w-full flex text-slate-500 items-center p-2 bg-[#202124]"
              >
                <input type="checkbox"/>
                <div className="sender min-w-40 max-w-40 truncate">
                  <p className='mx-1 truncate'>{emailObj.sender.split(/<|>/)[0]}</p>
                </div>
                <div className="mx-4 main-content flex-grow truncate">
                  <p className="truncate">{emailObj.email}</p>
                </div>
                <button
                  className="hover:border hover:border-slate-200 rounded"
                  onClick={() => {setIsOpen(true);
                  setEmailContent({content:emailObj.email,sender:emailObj.sender.split(/<|>/)[1]})}}
                >
                  <FaReply className="m-1" />
                </button>
              </div>
            ))}
          </div>
          <div className="button-container flex justify-end mt-10">
            <button>
              <IoIosArrowBack onClick={()=>{
                if(limit-5>=5){
                  fetchEmails(limit-5)
                }
             }} size={25}></IoIosArrowBack>
            </button>
            <button onClick={()=>{fetchEmails(limit+5)}}>
              <IoIosArrowForward size={25} ></IoIosArrowForward>
            </button>
          </div>
        </>
      )}

      {isOpen && <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      && 
      <EmailPop sender={emailContent.sender} isOpen={isOpen} setIsOpen={setIsOpen} content={emailContent.content}></EmailPop>
      }

      {data.length===0 &&(!isError) && <Skeleton count={5} baseColor='#202124' /> }
      {isError && <h1 className='mt-4 text-slate-200'>Sorry. Couldn't Fetch Emails,Try Again</h1>}
    </>
  )
}


export default EmailContainer;