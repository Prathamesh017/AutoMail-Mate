import React, { useEffect } from 'react'
import axios from  "axios";
function Dashboard() {
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
    console.log(response);
   } catch (error) {
    console.log(error);   
   }
  }
  useEffect(()=>{
    fetchEmails();
  },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard