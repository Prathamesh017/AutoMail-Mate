import React, { useState } from 'react'

const EmailPop = ({ isOpen, setIsOpen }) => {
  let defaultText =
    "hank you for sharing the top matching jobs based on my preferences. I'll review them carefully and click on any job link that aligns with my experience range and location preferences. Appreciate your assistance"
  const [text, setText] = useState(defaultText)

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-1/4 ">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Generated Response</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            onClick={() => {
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
            className="w-full"
            rows={4}
            cols={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
         <div className='flex justify-end'>
        <button className='bg-sky-700 p-2 rounded hover:text-slate-200'>Send Email</button>
         </div>
      </div>
    </div>
  )
}

export default EmailPop
