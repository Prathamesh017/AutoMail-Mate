import React from 'react'

const options = [
  {value:"select",label:"Select Label", disabled:true}, 
  { value: 'interested', label: 'Interested'},
  { value: 'not-interested', label: 'Not Interested' },
  { value: 'more-info', label: 'More Info' },
]

function LabelEmail() {
  return (
    <div className="w-full mb-2">
      <div className='h-full'>
        <select className='bg-transparent border-none text-slate-100'>
          {options.map((opt) => {
            return <option className='border-none' selected={opt.disabled?opt.disabled:false}  disabled={opt.disabled?opt.disabled:false} value={opt.value}>{opt.label}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default LabelEmail
