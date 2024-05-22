import React, { useState } from 'react'
import { FaReply } from 'react-icons/fa'
import EmailPop from './email-popup'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
function EmailContainer({data}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-full h-full mt-4 flex flex-col gap-8">
    {data.length>0 && data.map((emailObj,i)=>{
      return (
      <div key={i} className="email-box w-full flex text-slate-500 items-center p-2 bg-[#202124]">
        <input type="checkbox"></input>
        <div className="sender min-w-40 truncate">
          <p className="mx-4">{emailObj.sender.split(/<|>/)[0]}</p>
        </div>
        <div className="mx-4 main-content flex-grow truncate">
          <p className="truncate">
           {
            emailObj.email
           }
            
          </p>
        </div>
        <button
          className="hover:border hover:border-slate-200 rounded"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <FaReply className="m-1" />
        </button>
      </div>
    )
    })}
    <div className='button-container self-end mt-6'>
    <button>
        <IoIosArrowBack  size={20}></IoIosArrowBack>
      </button>
      <button>
        <IoIosArrowForward  size={20}></IoIosArrowForward>
      </button>
    </div>

      
      
     

      {isOpen && <div className="fixed inset-0 bg-gray-900 opacity-50"></div>}
      <EmailPop isOpen={isOpen} setIsOpen={setIsOpen}></EmailPop>
    </div>
  )
}

export default EmailContainer
