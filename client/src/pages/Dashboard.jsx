import React, { useEffect, useState } from 'react'
import axios from  "axios";
import LabelEmail from '../components/label-email';
import EmailContainer from '../components/email-container';
function Dashboard() {
  const [data,setData]=useState([]);
  let url=process.env.REACT_APP_SERVER_URL;
  async function fetchEmails(){
    try {
      const access_token=JSON.parse(localStorage.getItem("token"));
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
      const response = await axios.get(`${url}/email`,config);
      setData(response.data.data);
    console.log(response);
   } catch (error) {
    console.log(error);   
   }
  }
  useEffect(()=>{
    fetchEmails();
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
    <EmailContainer data={data}></EmailContainer>
      </div>
      </div>
    </div>
  )
}

export default Dashboard