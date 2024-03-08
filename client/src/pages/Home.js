import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LayOut from '../components/LayOut';
import { Row, message } from 'antd';
import Doctors from '../components/Doctors';
function Home() {

  const[doctors,setDoctors]=useState([]);

  const getuserdata=async ()=>{

    try {
      await axios.post('/getuserdata',{},{
        headers:{
          Authorization: "Bearer " + localStorage.getItem('token'),
        }
      })

     
     // setName(res.data.user);
      
      
    } catch (error) {
      console.log(error);
    }

  }


  const getAlldoctors=async()=>{

    try {

      const res=await axios.get('/getalldoctor',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
       
      if(res.data.success) {
          message.success(res.data.message);
          setDoctors(res.data.doctor);

      }
      
    } catch (error) {
      
    }

  }

  useEffect(()=>{
    getuserdata();
    getAlldoctors();
  },[]);


  return (

    <LayOut>
      <h1 className='text-center '>Doctors List</h1>
      <Row>
      {
        doctors && doctors.map(doctor=>(
          <Doctors doctor={doctor}/> 
        ))
      }
      </Row>
     
    </LayOut>
   
       
         
       
    
  )
}

export default Home