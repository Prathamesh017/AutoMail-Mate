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
  const WS_URL = process.env.REACT_APP_WEBSOCKET_URL;
  const socket = new WebSocket(WS_URL);
  socket.addEventListener("open", event => {
     console.log("Connection Established")
  });
  // Listen for messages
  socket.addEventListener("message", event => {
    console.log("Message from server ", event.data)
    fetchEmails(0);
  });
  async function fetchEmails(emailCount){
    try {
      setData([]);
      setIsError(false);
      const access_token=JSON.parse(localStorage.getItem("token"));
      const mailType=JSON.parse(localStorage.getItem("mail"))
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          limit:emailCount,
        },
      }
      let endpoint=mailType==="gmail"?"gmail":"outlook"
      const response = await axios.get(`${url}/mail/${endpoint}`,config);
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