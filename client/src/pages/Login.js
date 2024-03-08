import React from 'react'
import { Form ,message} from "antd";
import '../style/Register.css';
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import {  useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../Redux/features/alertSlice';
function Login() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
    const handelForm=async(event)=>{
      dispatch(showLoading());
        const res=await axios.post('/login',event);
        dispatch(hideLoading());
       if(res.data.success){
        localStorage.setItem('token',res.data.token);
        message.success(res.data.message+" "+res.data.name);
        navigate('/');
        window.location.reload();
        return false;

       }else{
        dispatch(hideLoading());
        message.success(res.data.message);
       }
    }
  return (
    <div className="form-container">
       
    <Form layout="vertical" onFinish={handelForm} className="register-form">
    <h3>Login Form</h3>  
      
      <Form.Item label='Email' name='email'>
        <input type="email"  required/>
      </Form.Item> 
      <Form.Item label='Password' name='password'>
        <input type="password"  required/>
      </Form.Item>
      
      <Link to='/register' className="p-2">Don't have an Account?</Link>
      <button className="btn btn-primary ">Login</button>
    </Form>
  </div>
  )
}

export default Login