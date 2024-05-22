import React, { useEffect, useState } from 'react'
import axios from  "axios";
import LabelEmail from '../components/label-email';
import EmailContainer from '../components/email-container';
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const [data,setData]=useState([]);
  const [limit,setLimit]=useState(0);
  const [isError,setIsError]=useState(false);
  const navigate=useNavigate();
  let url=process.env.REACT_APP_SERVER_URL;
  async function fetchEmails(emailCount){
    try {
      setData([]);
      setIsError(false);
      const access_token=JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          limit:emailCount,
        },
      }
      const response = await axios.get(`${url}/email`,config);
      setData(response.data.data);
      setLimit(emailCount);
  
   } catch (error) {
    setIsError(true);
    console.log(error);   
   }
  }

  async function logout(){
     localStorage.clear();
     navigate("/")

  }
  useEffect(()=>{
    fetchEmails(0);
  },[])
  return (
    <div className="w-screen h-screen bg-[#202124] p-4">
    <div>
      <h1 className='text-xl text-slate-200'>AutoMail Mate</h1>
    </div>
      <div className=' p-4 bg-custom-gray  mt-4 h-5/6 rounded'>
      <div>
      <LabelEmail></LabelEmail>
      </div>
      <hr></hr>
      <div>
    <EmailContainer isError={isError} limit={limit} data={data} fetchEmails={fetchEmails}></EmailContainer>
      </div>
      </div>
      <div className='flex justify-end p-2'>
      <button onClick={logout} className='bg-[#4285F4] px-4 py-1 hover:text-slate-900 text-center rounded text-slate-200'>Logout</button>
      </div>
    </div>
  )
}

export default Dashboard